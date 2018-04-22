import { IListElement, ElementTypes, IBoard } from '../../interfaces';
import * as fse from 'fs-extra';
import { QueueService } from './queue-service';

export class DataService {

    private elementsFilePath = '../var/elements.json';
    private boardsFilePath = '../var/boards.json';
    private queueService: QueueService;

    constructor() {
        this.queueService = new QueueService();
    }

    public getBoards(keys: string[], callback: (error: Error, boards: IBoard[]) => void) {
        this._getQueued(this.boardsFilePath, keys, callback);
    }

    public getElements(keys: string[], callback: (error: Error, elements: IListElement[]) => void): void {
        this._getQueued(this.elementsFilePath, keys, callback);
    }

    public saveElement(element: IListElement, callback: (error: any) => void): void {
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
            if (!keys) {
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
/*
let dataService: DataService = new DataService();
let element: IListElement = { key: 'firstKey', type: 'advertisement' };
let element2: IListElement = { key: 'secondKEy', type: 'advertisement' };
let element3: IListElement = { key: 'thirdKey', type: 'advertisement' };

let board1 : IBoard =  { key: 'boardKey11122', elementKeys: ['firstKey', 'secondKey'] };
let board2 : IBoard =  { key: 'boardKey22222', elementKeys: ['firstKey', 'secondKey'] };
let board3 : IBoard =  { key: 'boardKey3', elementKeys: ['firstKey', 'secondKey'] };

function testDataService() {
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

function saveBoards() {
    var errorCb = (error, board) => {
        if(error) {
            console.log('failed to save board.', board);
        } else {
            console.log('board saved: ', board);
        }
    }
    console.log('saving board: ', board1);
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
saveBoards();
//readOutDataService();
//testDataService();*/


