import { Component } from '@angular/core';
import { IListElement } from '../interfaces';
import { listElements } from '../dummy-store';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-edit-borads',
  templateUrl: './edit-boards.component.html',
  styleUrls: ['./edit-boards.component.css']
})
export class EditBoardsComponent {

  public defaultAdvertisementKey = '1';

  elements: IListElement[] = listElements;

  constructor() {

  }
}
