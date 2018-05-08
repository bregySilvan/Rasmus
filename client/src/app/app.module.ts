import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ROUTES } from './routes';
import { RASMUS_COMPONENTS } from './components/index';
import { RASMUS_PROVIDERS } from './services/index';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './app.state';
import { EffectsModule, Effect } from '@ngrx/effects';
import { RouterEffects } from './effects/index';
import { DebugEffect } from './effects/debug.effects';
import { NetworkEffects } from './effects/network.effects';
import { HttpModule } from '@angular/http';
import { ElementEffects } from './effects/element.effects';
import { NgDragDropModule } from 'ng-drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    ...RASMUS_COMPONENTS
  ],
  imports: [
    BrowserModule,
    HttpModule ,
    RouterModule.forRoot(CUSTOM_ROUTES),
    NgDragDropModule.forRoot(),
    StoreModule.provideStore(AppReducer),
    EffectsModule.run(RouterEffects),
    EffectsModule.run(DebugEffect),
    EffectsModule.run(NetworkEffects),
    EffectsModule.run(ElementEffects),
    EffectsModule.run(NetworkEffects)
  ],
  providers: RASMUS_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule { }
