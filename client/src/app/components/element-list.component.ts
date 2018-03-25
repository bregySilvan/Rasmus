import { Component, Input, OnInit } from '@angular/core';
import { IListElement, ElementTypes } from '../interfaces';

export type ListAlignments = 'horizontal' | 'vertical';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})

// pls find a better name. It's confusing since list-element component also exists
export class ElementListComponent implements OnInit {

  @Input() alignment: ListAlignments = 'vertical';
// @Input() draggable = false; //is for future purposes.
  @Input() elements: IListElement[] = [];

  ngOnInit() {
    console.log('elements in elementList: ', this.elements);
  }
}
