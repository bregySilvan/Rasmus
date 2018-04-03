
import { IListElement, IAdvertisement, ElementTypes } from '../../../interfaces';

export const advertisementList: IAdvertisement[] =
[{
  key: '1',
  type: 'advertisement',
  name: 'preferred banner',
  description: 'some ad description this is',
  imageURL: 'https://i.imgur.com/IUxU35q.jpg'
}, {
  key: '2',
  type: 'advertisement',
  name: 'To not to use at work',
  description: 'some ad description this is',
//  imageURL: 'https://ae01.alicdn.com/kf/HTB1KMrVQpXXXXX3XpXXq6xXFXXXw/' +
  //          'Sexy-Mousse-new-Lace-Bra-Set-Floral-thin-Cup-Bras-Sexy-Girls-Lingerie-Underwear-Set-Black.jpg_640x640.jpg'
  imageURL: 'https://www.webwire.com/prmedia/7/220577/220577-1-m.jpg?201832564846'
}, {
  key: '3',
  type: 'advertisement',
  name: 'Finished last wedn.',
  description: 'some ad description this is',
  imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJn1BGUcO9mlYvq_v6PlrLzQc_G1fWtb6Z73pXsM6ubNXNoLZgZQ'
}, {
  key: '4',
  type: 'advertisement',
  name: 'Finished last wedn.',
  description: 'some ad description this is',
  imageURL: 'http://hanassets.nd.gov/images/product/test.png'
}, {
  key: '5',
  type: 'advertisement',
  name: 'Finished last wedn.',
  description: 'some ad description this is',
  imageURL: 'https://www.centraltest.com/sites/all/files/platforme-evaluation-en-450x290.png'
}];

export const advertisementKeys: string[] = ['1', '2', '3'];

export const listElements: IListElement[] = [
  {
    key: '1',
    type: ElementTypes.advertisement
  }, {
    key: '2',
    type: ElementTypes.advertisement
  },  {
    key: '3',
    type: ElementTypes.advertisement
  }, {
    key: '4',
    type: ElementTypes.advertisement
  }, {
    key: '5',
    type: ElementTypes.advertisement
  }
];
