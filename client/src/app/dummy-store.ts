import { IAdvertisement } from './reducer/advertisement.reducer';

export const advertisementList: IAdvertisement[] =
[{
  key: '1',
  title: 'Title number 1',
  description: 'some ad description this is',
  imageURL: 'https://i.imgur.com/IUxU35q.jpg'
}, {
  key: '2',
  title: 'Title number 2',
  description: 'some ad description this is',
//  imageURL: 'https://ae01.alicdn.com/kf/HTB1KMrVQpXXXXX3XpXXq6xXFXXXw/' +
  //          'Sexy-Mousse-new-Lace-Bra-Set-Floral-thin-Cup-Bras-Sexy-Girls-Lingerie-Underwear-Set-Black.jpg_640x640.jpg'
  imageURL: 'https://www.webwire.com/prmedia/7/220577/220577-1-m.jpg?201832564846'
}, {
  key: '3',
  title: 'title Number 3',
  description: 'some ad description this is',
  imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJn1BGUcO9mlYvq_v6PlrLzQc_G1fWtb6Z73pXsM6ubNXNoLZgZQ'
}];

export const advertisementKeys: string[] = ['1', '2', '3'];
