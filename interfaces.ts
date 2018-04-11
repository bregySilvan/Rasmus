
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
  id: string;
  elements: IListElement[];
}

export type ElementTypes = 'advertisement';
