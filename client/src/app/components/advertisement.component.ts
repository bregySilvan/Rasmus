import { Component, Input, OnInit } from '@angular/core';
import { advertisementList } from '../dummy-store';
import { IAdvertisement } from '../../../../interfaces';

declare var window, console, localStorage;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {

  @Input() key: string;
  advertisement: IAdvertisement | null = null;

  constructor() {

    // replace with select statement from store..
  }

  ngOnInit() {
  //  console.log('taking advertisement with key: ', this.key);
    let advertisement = advertisementList.find((adv: IAdvertisement) => adv.key === this.key);
    if(advertisement) {
      this.advertisement = advertisement;
    }
  }
}
