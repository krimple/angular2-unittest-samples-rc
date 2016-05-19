import {
  it,
  describe,
  expect,
  inject,
  injectAsync,
  beforeEach,
  beforeEachProviders
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {provide} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BlogRoll} from './blog-roll';
import {BlogEntry} from '../domain/blog-entry';
import {BlogService} from '../services/blog-service';
import {MarkdownService} from '../services/markdown-service';

class MockMarkdownService extends MarkdownService {
  toHtml(text: string): string {
    return text;
  }
}
class MockBlogService extends BlogService {
  constructor() {
    super(null);
  }

  getBlogs() {
    console.log('sending fake answers!');
    return Observable.of([
      {
        id: 26,
        title: 'The title',
        contentRendered: '<p><b>Hi there</b></p>',
        contentMarkdown: '*Hi there*'
      }
    ]);
  }
}

describe('Blog Roll Component...', () => {
  var mockBlogService;

  beforeEach(() => {
    mockBlogService = new MockBlogService();
  });

 it('shows list of blog items by default', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb
      .overrideProviders(BlogRoll, [provide(BlogService, {useValue: mockBlogService})])
      .createAsync(BlogRoll)
      .then((fixture) => {
        let nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        // we start with the blog roll panel visible
        expect(fixture.componentInstance.editing).toBe(false);
        expect(nativeElement.querySelector('#blog-editor-panel') === null).toBe(true);
        expect(nativeElement.querySelector('#blog-roll-panel') === null).toBe(false);

        let trs = nativeElement.querySelectorAll('tr');
        expect(trs.length).toBe(2);

        let tdTitleContent = trs[1].children[1].innerHTML;
        let tdRenderedContent = trs[1].children[2].innerHTML;
        expect(tdTitleContent).toContain('The title');
        expect(tdRenderedContent).toContain('Hi there');

      });
  }));

  it('should show blog editor div when New is clicked...',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb
        .overrideProviders(BlogRoll, [provide(BlogService, {useValue: mockBlogService})])
        .createAsync(BlogRoll)
        .then((fixture) => {
          let nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          // trigger the 'new' button and swap visible panels
          fixture.nativeElement.querySelector('i.glyphicon-plus-sign').click();

          // process the click event
          fixture.detectChanges();

          expect(fixture.componentInstance.editing).toBe(true);
          expect(nativeElement.querySelector('#blog-editor-panel') === null).toBe(false);
          expect(nativeElement.querySelector('#blog-roll-panel') === null).toBe(true);
        });
    }));

  it('should open the editing pane if the edit button is clicked',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb
        .overrideProviders(BlogRoll, [provide(BlogService, {useValue: mockBlogService})])
        .createAsync(BlogRoll)
        .then((fixture) => {
          let nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          nativeElement.querySelector('i.glyphicon-edit').click();
          fixture.detectChanges();
          expect(fixture.componentInstance.editing).toBe(true);
          let blog = fixture.componentInstance.blog;
          expect(blog).toBeDefined();
          expect(blog.id).toBeDefined();
        });
    }));
});


