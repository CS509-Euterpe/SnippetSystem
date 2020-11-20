import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/htmlembedded/htmlembedded';
import 'codemirror/mode/perl/perl';
import 'codemirror/mode/python/python';
import 'codemirror/mode/go/go';
import 'codemirror/addon/selection/mark-selection'

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
