import { IListElement, ElementTypes, IBoard } from '../../interfaces';
import * as fse from 'fs-extra';
import { QueueService } from './queue-service';

export class DataService {

    private elementsFilePath = '../var/elements.json';
    private boardsFilePath = '../var/boards.json';
    private queueService: QueueService;

    constructor() {
        this.queueService = new QueueService();
        if (!fse.existsSync(this.elementsFilePath)) {
            fse.createFileSync(this.elementsFilePath);
        }
        if (!fse.existsSync(this.boardsFilePath)) {
            fse.createFileSync(this.boardsFilePath);
        }
    }

    public getBoards(keys: string[], callback: (error: Error, boards: IBoard[]) => void) {
        this.queueService.addToQueue((next) => {
            this._getBoards(this.boardsFilePath, keys, (err: Error, boards: IBoard[]) => {
                callback(err, boards);
                next();
            });
        });
    }

    private _getBoards(filePath: string, keys: string[], callback: (error: Error, element: IBoard[]) => void) {
        fse.readJSON(filePath, async (readFileError: Error, jsonData: any) => {
            let requestedAvailableKeys = [];
            if (readFileError || !jsonData) {
                return callback(new Error('no board data found') , requestedAvailableKeys);
            }
            let jsonDataKeys = Object.keys(jsonData);
            if (!keys) {
                requestedAvailableKeys = jsonDataKeys;
            } else {
                requestedAvailableKeys = keys.filter(key => !!jsonData[key]);
            }
            
            callback(null, requestedAvailableKeys.map(key => <IBoard>jsonData[key]));
        });
    }

    public getElements(keys: string[], callback: (error: Error, element: IListElement[]) => void): void {
        this.queueService.addToQueue((next) => {
            this._getElements(this.elementsFilePath, keys, (err: Error, elements: IListElement[]) => {
                callback(err, elements);
                next();
            });
        });
    }

    public saveElement(element: IListElement, callback: (error: any) => void): void {
        this.queueService.addToQueue((next) => {
            this._saveElement(this.elementsFilePath, element, (err: any) => {
                callback(err);
                next();
            });
        });
    }

    private _getElements(filePath: string, keys: string[], callback: (error: Error, elements: IListElement[]) => void): void {
        fse.readJSON(this.elementsFilePath, async (readFileError: Error, jsonData: any) => {
            let elements: IListElement[] = [];
            if (readFileError || !jsonData) {
                return callback(new Error('no board data found'), elements);
            }
            let jsonDataKeys = Object.keys(jsonData);
            if (!keys) {
                return jsonDataKeys.map(key => <IListElement>jsonData[key]);
            }
            keys.filter(key => !!jsonData[key]).map(key => <IListElement>jsonData[key]);

            callback(null, elements);
        });
    }

    private _saveElement(file: string, element: IListElement, callback: (error?: any) => void): void {
        if (element === null) {
            return callback(new Error('object is null so it wasn\'t saved'));
        }
        try {
            return this._saveElementNoChecks(file, element, callback);
        } catch (err) {
            return callback(err);
        }
    }

    private _saveElementNoChecks(file: string, element: IListElement, callback: (error?: any) => void) {
        this._setupJsonFile(file, (error?: any) => {
            if (error) {
                return callback(error);
            }
            return this._updateJson(file, element, element.key, callback);
        });
    }

    private _setupJsonFile(file: string, callback: (error?: any) => void): void {
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
let element: IListElement = { key: 'firstKey', type: 'advertisement' };
let element2: IListElement = { key: 'secondKEy', type: 'advertisement' };
let element3: IListElement = { key: 'thirdKey', type: 'advertisement' };

let board1 : IBoard =  { key: 'boardKey1', elementKeys: ['firstKey', 'secondKey'] };
let board2 : IBoard =  { key: 'boardKey2', elementKeys: ['firstKey', 'secondKey'] };
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
//readOutDataService();
testDataService();
