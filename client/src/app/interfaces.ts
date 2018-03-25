
export interface IListElement {
  key: string;
  type: ElementTypes;
}

export interface IAdvertisement extends IListElement {
  name: string;
  description: string;
  imageURL: string;
}

 // export type ElementTypes = 'advertisement';

export enum ElementTypes {
  advertisement =  'advertisement'
}