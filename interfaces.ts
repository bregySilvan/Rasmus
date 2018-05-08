
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

export interface IBoard extends IElement {
  elementKeys: string[];
}

export type ElementTypes = 'advertisement' | 'board' | 'empty'; // empty is used for developping.
