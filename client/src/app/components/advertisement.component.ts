import { Component, Input, OnInit } from '@angular/core';
import { advertisementList } from '../dummy-store';
import { IAdvertisement } from '../interfaces';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvirtisementComponent implements OnInit {

  @Input() key: string;
  advertisement: IAdvertisement = null;

  constructor() {

    // replace with select statement from store..
  }

  ngOnInit() {
    console.log('taking advertisement with key: ', this.key);
    this.advertisement = advertisementList.find((adv: IAdvertisement) => adv.key === this.key);
  }
}
