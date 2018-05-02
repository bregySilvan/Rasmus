import { IListElement, ElementTypes, IBoard, IAdvertisement } from '../../interfaces';
import * as fse from 'fs-extra';
import { QueueService } from './queue-service';

export class DataService {

    private elementsFilePath = './var/elements.json';
    private boardsFilePath = './var/boards.json';
    private queueService: QueueService;

    constructor() {
        this.queueService = new QueueService();
    }
    
    public getBoards(keys: string[], callback: (error: Error, boards: IBoard[]) => void) {
        this._getQueued(this.boardsFilePath, keys, (error: any, data: any) => {
            if(error) {
                return callback(error, []);
            }
            callback(error, Object.keys(data).map(key => <IBoard>data[key]));
        });
    }

    public getElements(keys: string[], callback: (error: Error, elements: IListElement[]) => void): void {
        this._getQueued(this.elementsFilePath, keys, (error: any, data: any) => {
            if(error) {
                return callback(error, []);
            }
            callback(error, Object.keys(data).map(key => <IListElement>data[key]));
        });
    }

    public saveElement(element: IListElement, callback: (error: any) => void): void {
        console.warn('saving element on server::');
        this._saveQueued(this.elementsFilePath, element, callback);
    }

    public saveBoard(board: IBoard, callback: (error: any) => void) {

        this._saveQueued(this.boardsFilePath, board, callback);
    }

    private _getQueued(filePath: string, keys: string[], callback: (error: any, data: any) => void) {
        this.queueService.addToQueue((next) => {
            this._get(filePath, keys, (err: any, data: any[]) => {
                callback(err, data);
                next();
            });
        });
    }

    private _saveQueued(filePath: string, data: any, callback: (error: any) => void) {
        this.queueService.addToQueue((next) => {
            this._save(filePath, data, (err: any) => {
                callback(err);
                next();
            });
        });
    }

    private _get(filePath: string, keys: string[], callback: (error: Error, data: any[]) => void) {
        fse.readJSON(filePath, async (readFileError: Error, jsonData: any) => {
            let requestedAvailableKeys = [];
            if (readFileError || !jsonData) {
                return callback(new Error('no data found at ' + filePath) , requestedAvailableKeys);
            }

            let jsonDataKeys = Object.keys(jsonData);
            if (!keys || !keys.length) {
                requestedAvailableKeys = jsonDataKeys;
            } else {
                requestedAvailableKeys = keys.filter(key => !!jsonData[key]);
            }

            callback(null, requestedAvailableKeys.map(key => jsonData[key]));

        });  
    }

    private _save(file: string, element: any, callback: (error: any) => void): void {
        if (element === null) {
            return callback(new Error('object is null so it wasn\'t saved in file ' + file));
        }
        try {
            return this._saveNoChecks(file, element, callback);
        } catch (err) {
            return callback(err);
        }
    }

    private _saveNoChecks(file: string, element: any, callback: (error?: any) => void) {
        this._checkJsonFile(file, (error?: any) => {
            if (error) {
                return callback(error);
            }
            return this._updateJson(file, element, element.key, callback);
        });
    }


    private _checkJsonFile(file: string, callback: (error?: any) => void): void {
        fse.exists(file, async (exists: boolean) => {
            if (exists) {
                return callback(null);
            }
            await fse.createFile(file);
            return callback(null);
        });
    }

    private _updateJson(file: string, obj: any, key: string, callback: (error?: any) => void): void {
        fse.readJSON(file, async (error: Error, jsonData: any) => {
            jsonData = jsonData || {};
            jsonData[key] = obj;
            fse.writeJson(file, jsonData, (error: Error) => {
                if (error) {
                    // logger.log(error);
                    return callback(error);
                }
                return callback();
            });
        });
    }

    //  constructor(private elementFilePath: string) {
    // @toDo: take filepaths from constructor.
    // }
}

let dataService: DataService = new DataService();

let board1 : IBoard =  { key: '111', elementKeys: ['firstKey', 'secondKey'] };
let board2 : IBoard =  { key: '222', elementKeys: ['firstKey', 'secondKey'] };
let board3 : IBoard =  { key: '333', elementKeys: ['firstKey', 'secondKey'] };
/*
function saveElements() {
    console.log('svae elements #######################');
    dataService.saveElement(element, (error?: any) => {
        console.log('elemetn saved');
        if(error) {
            console.log('error? => ', error);
        }
    });
    dataService.saveElement(element2, (error?: any) => {
        console.log('elemetn saved');
        if(error) {
            console.log('error? => ', error);
        }
    });
    dataService.saveElement(element3, (error?: any) => {
        console.log('elemetn saved');
        if(error) {
            console.log('error? => ', error);
        }
    });
    //  service.saveElement({key: 'second key', type: ElementTypes.advertisement});
    //  service.saveElement({key: 'third key', type: ElementTypes.advertisement});
}
/* */
const advertisementList: IAdvertisement[] =
[{
  key: '122',
  type: 'advertisement',
  name: 'preferred banner',
  description: 'some ad description this is',
  imageURL: 'https://i.imgur.com/IUxU35q.jpg'
}, {
  key: '233',
  type: 'advertisement',
  name: 'To not to use at work',
  description: 'some ad description this is',
//  imageURL: 'https://ae01.alicdn.com/kf/HTB1KMrVQpXXXXX3XpXXq6xXFXXXw/' +
  //          'Sexy-Mousse-new-Lace-Bra-Set-Floral-thin-Cup-Bras-Sexy-Girls-Lingerie-Underwear-Set-Black.jpg_640x640.jpg'
  imageURL: 'https://www.webwire.com/prmedia/7/220577/220577-1-m.jpg?201832564846'
}, {
  key: '344',
  type: 'advertisement',
  name: 'Finished last wedn.',
  description: 'some ad description this is',
 // imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJn1BGUcO9mlYvq_v6PlrLzQc_G1fWtb6Z73pXsM6ubNXNoLZgZQ'
  imageURL: 'https://www.planwallpaper.com/static/images/001_week-in-pictures-08.jpg'
}, {
  key: '455',
  type: 'advertisement',
  name: 'Some nice stuff',
  description: 'some ad description this is',
  imageURL: 'http://hanassets.nd.gov/images/product/test.png'
}, {
  key: '566',
  type: 'advertisement',
  name: 'I know what you did...',
  description: 'some ad description this is',
  imageURL: 'https://www.centraltest.com/sites/all/files/platforme-evaluation-en-450x290.png'
}, {
    key: '5664323',
    type: 'advertisement',
    name: 'I know what you did...',
    description: 'some ad description this is',
    imageURL: 'https://www.centraltest.com/sites/all/files/platforme-evaluation-en-450x290.png'
  }];

function saveAdvertisements() {
    advertisementList.forEach((ad) => {
        dataService.saveElement(ad, (error) => {
            console.log('erro: ', error);
        });
    })
}
function saveBoards() {
  
    var errorCb = (error, board) => {
        if(error) {
       //     console.log('failed to save board.', board);
        } else {
            console.log('board saved: ', board);
        }
    }
    
    dataService.saveBoard(board1, (err) => {
        
        errorCb(err, board1);
    });

    dataService.saveBoard(board2, (err) => {
        errorCb(err, board2);
    });

    dataService.saveBoard(board3, (err) => {
        errorCb(err, board3);
    });
}

function readOutDataService() {
    
    let dataService: DataService = new DataService();
    let elementKeys = ['secondKEy', 'firstKey'];
    dataService.getElements(elementKeys, (error: Error, elements: IListElement[]) => {
        if(error) {
            console.log('error occured:: ', error);

        } else {
            console.log('listElements:: ', elements);
        }
    });
}
function getElements() {
    
    dataService.getElements([], (error: Error, elements: IListElement[]) => {
        console.log('getElements #######################');
        console.log('error: ', error);
        console.log(JSON.stringify(elements)); 
    });
}
function getBoards() {

    dataService.getBoards([], (error, boards) => {
        console.log('getBoards #######################');
        console.log('error: ', error);
        console.log(JSON.stringify(boards));
    });
}
//saveAdvertisements();

//saveElements();
//saveBoards();
//getElements();
//getBoards();






