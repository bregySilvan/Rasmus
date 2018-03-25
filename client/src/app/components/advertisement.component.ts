import { Component, Input, OnInit } from '@angular/core';
import { IAdvertisement } from '../reducer/advertisement.reducer';
import { advertisementList } from '../dummy-store';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvirtisementComponent implements OnInit {

  @Input()
  advertisementKey: string;
  advertisement: IAdvertisement = null;

  constructor() {

    // replace with select statement from store..
  }

  ngOnInit() {
    console.log('taking advertisement with key: ', this.advertisementKey);
    this.advertisement = advertisementList.find((adv: IAdvertisement) => adv.key === this.advertisementKey);
  }
}
