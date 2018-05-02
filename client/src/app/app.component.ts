import { Component, OnInit } from '@angular/core';
import { RouterService } from './services/router.service';
import { LogService } from './services/log.service';
import { NetworkService } from './services/network.service';
import { AUTO_DATA_LOADING } from '../../../config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public navigateToEditBoard(): void {
    this._navigateTo('edit-boards');
  }

  public navigateToMain(): void {
    this._navigateTo('main');
  }

  public _navigateTo(url: string): void {
    url = url.startsWith('/') ? url : '/'+url;
    this.routerService.navigateTo(url);
  }

  constructor(private routerService: RouterService,
              private logService: LogService,
              private networkService: NetworkService) {
              
                

  }

  ngOnInit() {
    if(AUTO_DATA_LOADING) {
      this.networkService.startDetection();
    }
      
  }

}
