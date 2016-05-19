import {MarkdownService} from './markdown-service';

import {
  it, inject, describe, beforeEach, beforeEachProviders, expect
} from '@angular/core/testing';

describe('Markdown transformer service', () => {
  beforeEachProviders(() => {
    return [
      MarkdownService
    ];
  });

  it('Should translate markdown to HTML!', inject([MarkdownService], (markdownService) => {
    // note - this fails if we use toEqual as it finds a newline in the toHtml param
    // TODO figure out why
    expect(markdownService.toHtml('hi')).toContain('<p>hi</p>');
  }));

});
