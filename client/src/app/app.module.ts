import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ROUTES } from './routes';
import { RASMUS_COMPONENTS } from './components/index';
import { AdvertisementComponent } from './components/advertisement.component';
import { ListElementComponent } from './components/list-element.component';
import { RASMUS_PROVIDERS } from './services/index';

@NgModule({
  declarations: [
    AppComponent,
    ...RASMUS_COMPONENTS
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(CUSTOM_ROUTES)
  ],
  providers: [RASMUS_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
