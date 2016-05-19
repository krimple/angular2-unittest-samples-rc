import {Component, provide} from '@angular/core';
import {AppShellComponent} from '../app-shell/app-shell';
import {
    it,
    xit,
    inject,
    injectAsync,
    beforeEachProviders
} from '@angular/core/testing';
import {
  TestComponentBuilder
} from '@angular/compiler/testing';
import {BlogRoll} from '../blog-roll/blog-roll';
import {BlogEntry} from '../domain/blog-entry';
import {BlogService} from '../services/blog-service';

describe('Application Shell', () => {
    var shell: AppShellComponent;

    beforeEachProviders(() => {
        return [
          BlogService,
          provide(BlogRoll, { useValue: { }})
        ];
    });

    xit('Can be created', injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(AppShellComponent)
            .then((fixture) => {
                fixture.detectChanges();
                let blogRoll = fixture.nativeElement.getElementsByTagName('<blog-roll>');
                expect(blogRoll).toBeDefined();
            });
    }));
});
