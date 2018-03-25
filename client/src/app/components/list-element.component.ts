import { Component, Input, OnInit } from '@angular/core';
import { IListElement, ElementTypes } from '../interfaces';
/**
 * responsible for holding either
 * an advertisement
 * a boardType for example..
 * an element-list
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.css']
})
export class ListElementComponent implements OnInit {

  @Input() element: IListElement;

  constructor() {

  }

  ngOnInit() {
    console.warn('this.element: ', this.element);
  }
}
