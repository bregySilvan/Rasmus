
export interface IElement {
  key: string;
  type: ElementTypes;
}

export interface IAdvertisement extends IElement {
  name: string;
  description: string;
  imageURL: string;
}

export interface IBoard {
  key: string;
  elementKeys: string[];
}



export type ElementTypes = 'advertisement' | 'empty';
