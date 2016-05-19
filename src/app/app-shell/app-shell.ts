import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {BlogRoll} from '../blog-roll/blog-roll';

@Component({
  selector: 'app-shell',
  template: `
      <div class="container">
        <blog-roll (edit)="setBlog(blog)"></blog-roll>
      </div>
    `,
  directives: [CORE_DIRECTIVES, BlogRoll]
})
export class AppShellComponent {
  constructor() {}

}
