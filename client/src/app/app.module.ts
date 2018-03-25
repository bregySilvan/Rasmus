import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ROUTES } from './routes';
import { MainPageComponent, EditBoardsComponent } from './components';
import { RouterService } from './services/router.service';
import { AdvirtisementComponent } from './components/advertisement.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EditBoardsComponent,
    AdvirtisementComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(CUSTOM_ROUTES)
  ],
  providers: [RouterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
