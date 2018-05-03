
export interface IComparable {
  key: string;
}

export interface IElement extends IComparable {
  type: ElementTypes;
}

export interface IAdvertisement extends IElement {
  name: string;
  description: string;
  imageURL: string;
}

export interface IBoard extends IElement{
  elementKeys: string[];
}

export type ElementTypes = 'advertisement' | 'board' | 'empty';
