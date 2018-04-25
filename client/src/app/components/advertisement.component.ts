import { Component, Input, OnInit } from '@angular/core';
import { advertisementList } from '../dummy-store';
import { IAdvertisement } from '../../../../interfaces';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent {

  @Input()
  advertisement: IAdvertisement | null = null;

  constructor() {

    // replace with select statement from store..
  }


}
