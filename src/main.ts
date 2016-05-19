import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './app/';
import { AppShellComponent } from './app/app-shell/app-shell';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppShellComponent);
