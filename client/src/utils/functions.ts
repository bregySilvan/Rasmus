import * as _ from 'lodash';
import { IComparable } from '../../../interfaces';

export function unionDistinct<T>(update: Array<T>, old: Array<T>, isSameObj: (val1: T, val2: T) => boolean): { unionArr: Array<T>, hasChanged: boolean } {
  let hasChanged = false;
  let unionArr = old.concat();

  update.forEach((updatedObj: T) => {
    let index = old.findIndex((oldObj: T) => isSameObj(updatedObj, oldObj));
    if (index > -1) {
      if (!_.isEqual(updatedObj, old[index])) {
        hasChanged = true;
        unionArr[index] = updatedObj;
      }
    } else {
      unionArr.push(updatedObj);
      hasChanged = true;
    }
  });

  return { unionArr, hasChanged };
}

export function unionElementsDistinct(update: Array<IComparable>, old: Array<IComparable>): { unionArr: Array<IComparable>, hasChanged: boolean } {
  let hasChanged = false;
  let unionArr = old.concat();

  update.forEach((updatedObj) => {
    let index = old.findIndex(oldObj => updatedObj.key === oldObj.key);
    if (index > -1) {
      if (!_.isEqual(updatedObj, old[index])) {
        hasChanged = true;
        unionArr[index] = updatedObj;
      }
    } else {
      unionArr.push(updatedObj);
      hasChanged = true;
    }
  });

  return { unionArr, hasChanged };
}

export function buildRequestUrl(host: string, port: number, location: string) {
  location = location.startsWith('/') ? location : `/${location}`
  return `http://${host}:${port}${location}`;
}

