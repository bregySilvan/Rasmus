
export interface IListElement {
  key: string;
  type: ElementTypes;
}

export interface IAdvertisement extends IListElement {
  name: string;
  description: string;
  imageURL: string;
}

export interface IBoard {
  key: string;
  elementKeys: string[];
}

export interface IDragInfo {
  element: IListElement;
  index: number;
}

export type ElementTypes = 'advertisement' | 'empty';
