import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ROUTES } from './routes';
import { MainPageComponent, EditBoardsComponent } from './components';
import { RouterService } from './services/router.service';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EditBoardsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(CUSTOM_ROUTES)
  ],
  providers: [RouterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
