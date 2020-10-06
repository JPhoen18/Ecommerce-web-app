import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { gsap } from 'gsap'
import { TimelineMax } from 'gsap'


// Force TimelineMax to not get dropped during build
gsap.registerPlugin(TimelineMax)

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
