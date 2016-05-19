import {Http, Headers, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BlogEntry} from '../domain/blog-entry';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {
  constructor(private http: Http) {
  }

  private getOptions(): RequestOptions {
    var headers: Headers = new Headers();
    headers.append('content-type', 'application/json; charset=utf-8');
    let opts = new RequestOptions({headers: headers});
    opts.headers = headers;
    return opts;
  }

  getBlogs(): Observable<any> {
    return this.http.get('/api/blogs')
      .map((res: Response) => {
        return BlogEntry.asBlogEntries(res.json());
      }, this.getOptions());
  }

  saveBlog(blog: BlogEntry): Observable<Response> {
    console.log('saving', blog.json());
    if (blog.id) {
      return this.http.put('/api/blogs/' + blog.id, blog.json(), this.getOptions());
    } else {
      return this.http.post('/api/blogs', blog.json(), this.getOptions());
    }
  }

  deleteBlogEntry(id: number): Observable<Response> {
    return this.http.delete('/api/blogs/' + id)
  }

  getBlog(id: number): any {
    return this.http.get('/api/blogs/' + id)
      .map((res: Response) => {
        console.log(res);
        return BlogEntry.asBlogEntry(res.json());
      });
  }

}
