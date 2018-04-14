import { Routes } from '@angular/router';
import { EditBoardsComponent } from './components/edit-boards.component';
import { MainPageComponent } from './components/mainpage.component';

export const CUSTOM_ROUTES: Routes = [
  { path: 'edit-boards', component: EditBoardsComponent },
  { path: 'main', component: MainPageComponent },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: MainPageComponent
  }
];

