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
export class AdvertisementComponent implements OnInit {

  @Input() key: string = '';
  listElement: IListElement | null = null;

  constructor(private store$: Store<IAppStore>) {

    // replace with select statement from store..
  }

  ngOnInit() {
    this.store$.select(x => x.element.availableElements).subscribe(elements =>  {
      let element = elements.find(element => element.key === this.key);
      if(element !== undefined) {
        this.listElement = element;
      }
    }); 
  }
}
