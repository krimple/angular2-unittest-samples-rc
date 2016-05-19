import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from '@angular/core/testing';
import {Headers, HTTP_PROVIDERS, BaseRequestOptions,
        XHRBackend, Response} from '@angular/http';
import {ResponseOptions} from '@angular/http';
import {provide} from '@angular/core';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BlogEntry} from '../domain/blog-entry';
import {BlogService} from './blog-service';

describe('Blog Service', () => {

  // All heed this block - it is required so that the test injector
  // is properly set up. Without doing this, you won't get the
  // fake backend injected into Http.

  // Also, you need to inject MockBackend as a provider before you wire
  // it to replace XHRBackend with the provide function!  So this is all
  // extremely important to set up right.
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      BlogService
    ];
  });


  it('should get blogs', inject([XHRBackend, BlogService], (mockBackend, blogService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body: [
                {
                  id: 26,
                  contentRendered: '<p><b>Hi there</b></p>',
                  contentMarkdown: '*Hi there*'
                }]
            }
          )));
      });

    blogService.getBlogs().subscribe((blogs: BlogEntry[]) => {
      expect(blogs.length).toBe(1);
      expect(blogs[0].id).toBe(26);
    });

  }));



  it('should get blogs async',
    injectAsync([XHRBackend, BlogService], (mockBackend, blogService) => {
    return new Promise((pass, fail) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [
                  {
                    id: 26,
                    contentRendered: '<p><b>Hi there</b></p>',
                    contentMarkdown: '*Hi there*'
                  }]
              }
            )));
        });

      try {
        blogService.getBlogs().subscribe(
          (data) => {
            expect(data.length).toBe(1);
            expect(data[0].id).toBe(26);
            expect(data[0].contentMarkdown).toBe('*Hi there*');
            pass();
          });
      } catch (error) {
        fail(error);
      }
    });
  }), 3000);

  it('should save updates to an existing blog entry',
    injectAsync([XHRBackend, BlogService], (mockBackend, blogService) => {
    return new Promise((resolve, reject) => {
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new ResponseOptions({status: 200}));
      });

      let data: BlogEntry = new BlogEntry('Blog Entry', '<p><b>Hi</b></p>', '*Hi*', 10);
      blogService.saveBlog(data).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          expect(successResult.status).toBe(200);
          resolve();
        });
    });
  }), 300);

  it('should delete an existing blog entry',
    injectAsync([XHRBackend, BlogService], (mockBackend, blogService) => {
    return new Promise((resolve, reject) => {
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new ResponseOptions({status: 201}));
      });

      blogService.deleteBlogEntry(23).subscribe(
        (successResult) => {
          resolve();
        },
        (errorResult) => {
          reject(errorResult);
        });
    });
  }), 300);
});
