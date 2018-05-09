import { Component, Input, OnInit } from '@angular/core';
import { IAdvertisement, IElement } from '../../../../interfaces';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import { LogService } from '../services/log.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {

  @Input()
  advertisement: IAdvertisement | null = null;


  constructor(private store$: Store<IAppStore>,
              private logService: LogService) {

    // replace with select statement from store..
  }

  ngOnInit() {
    if(!this.advertisement) {
      this.logService.log(this, 'received invalid element in advertisement comp: ', this.advertisement);
    }

    //this.logService.log(this, 'element: ', this.advertisement);

    
    
  }


}
