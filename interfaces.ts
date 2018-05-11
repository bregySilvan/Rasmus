
//  Comparable is more like an adition
export interface IComparable {
  key: string;
}

// IElement is more like baseclass
export interface IElement extends IComparable {
  type: ElementTypes;
}

export interface IAdvertisement extends IElement {
  name: string;
  description: string;
  imageURL: string;
}

export interface IContainer extends IBoard {
  contentType: ElementTypes;
}

export interface IBoard extends IElement {
  elements: IElement[];
}

export type ElementTypes = 'advertisement' | 'board' | 'empty' | 'container'; // empty is used for developping.
