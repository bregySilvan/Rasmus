import * as _ from 'lodash';
declare var console: any;
export function applyChanges<T>(update: Array<T>, old: Array<T>, isSameObj: (val1: T, val2: T) => boolean): { unionArr: Array<T>, hasChanged: boolean } {
  let hasChanged = false;
  let unionArr = old.concat();
  
  update.forEach((updatedObj: T) => {
    let index = old.findIndex((oldObj: T) => isSameObj(updatedObj, oldObj));
    if(index > -1) {
      if(!_.isEqual(updatedObj, old[index])) {
        hasChanged = true;
        unionArr[index] = updatedObj;
      }
    } else {
      unionArr.push(updatedObj);
      hasChanged = true;
    }
  });
  if(hasChanged) {
    console.warn('before:', update, old);
   console.warn('after:', unionArr);
  }
  

  return { unionArr, hasChanged };
}

