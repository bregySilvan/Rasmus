import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ROUTES } from './routes';
import { RASMUS_COMPONENTS } from './components/index';
import { AdvertisementComponent } from './components/advertisement.component';
import { ListElementComponent } from './components/list-element.component';
import { RASMUS_PROVIDERS } from './services/index';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './app.state';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './effects/index';
import { DebugEffect } from './effects/debug.effects';


@NgModule({
  declarations: [
    AppComponent,
    ...RASMUS_COMPONENTS
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(CUSTOM_ROUTES),
    StoreModule.provideStore(AppReducer),
    EffectsModule.run(RouterEffects),
    EffectsModule.run(DebugEffect)
  ],
  providers: [RASMUS_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
