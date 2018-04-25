import { Component, Input, OnInit } from '@angular/core';
import { IAdvertisement, IListElement } from '../../../../interfaces';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent {

  @Input()
  advertisement: IAdvertisement | null = null;


  constructor(private store$: Store<IAppStore>) {

    // replace with select statement from store..
  }


}
