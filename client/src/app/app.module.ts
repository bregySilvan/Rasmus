import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ROUTES } from './routes';
import { MainPageComponent, EditBoardsComponent, ElementListComponent } from './components';
import { RouterService } from './services/router.service';
import { AdvertisementComponent } from './components/advertisement.component';
import { ListElementComponent } from './components/list-element.component';
import { RequestService } from './services/request.service';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EditBoardsComponent,
    AdvertisementComponent,
    ElementListComponent,
    ListElementComponent,
    RequestService
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(CUSTOM_ROUTES)
  ],
  providers: [RouterService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
