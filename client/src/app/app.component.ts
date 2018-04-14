import { Component } from '@angular/core';
import { RouterService } from './services/router.service';
import { LogService } from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public navigateToEditBoard() {
    this._navigateTo('edit-boards');
  }

  public navigateToMain() {
    this._navigateTo('main');
  }

  public _navigateTo(url: string) {
    this.logService.log('navigating to: ', url);
    url = url.startsWith('/') ? url : '/'+url;
    this.routerService.navigateTo(url);
  }

  constructor(private routerService: RouterService,
              private logService: LogService) {

  }

}
