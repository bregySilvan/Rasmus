import { Component, Input, OnInit } from '@angular/core';
import { IListElement, ElementTypes } from '../../../../interfaces';
/**
 * responsible for holding either
 * an advertisement
 * a boardType for example..
 * an element-list
 */
declare var window, console, localStorage;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.css']
})
export class ListElementComponent implements OnInit {

  @Input() 
  element: IListElement | null = null;

  constructor() {

  }

  ngOnInit() {
    //console.warn('this.element: ', this.element);
  }
}
