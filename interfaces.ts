
export interface IListElement {
  key: string;
  type: ElementTypes;
}

export interface IAdvertisement extends IListElement {
  name: string;
  description: string;
  imageURL: string;
}

export interface IBoard extends IListElement{
  elementKeys: string[];
}

export type ElementTypes = 'advertisement' | 'board';
