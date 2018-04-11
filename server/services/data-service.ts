import { IListElement, ElementTypes } from '../../interfaces';
import * as fse from 'fs-extra';
import { QueueService } from './queue-service';

export class DataService {

    private elementsFilePath = '../var/elements.json';
    private queueService: QueueService;

    constructor() {
        this.queueService = new QueueService();
    }

    public getElements(keys: string[], callback: (error: Error, element: IListElement[]) => void): void {
        this.queueService.addToQueue((next) => {
            this._getElements(this.elementsFilePath, keys, (err: Error, elements: any[]) => {
                callback(err, elements as IListElement[]);
                next();
            });
        });
    }   

    private _getElements(filePath: string, keys: string[], callback: (error: Error, elements: any[]) => void): void {
        fse.readJSON(this.elementsFilePath, async (readFileError: Error, jsonData: any) => {
            let elements: IListElement[] = [];
            if(readFileError) {
                return callback(readFileError, elements);
            }
            let jsonDataKeys = Object.keys(jsonData);
            keys.forEach((elementKey: string) => {
                let index = jsonDataKeys.indexOf(elementKey);
                if(index > -1) {
                    elements.push(jsonData[jsonDataKeys[index]]);
                }
            });
            callback(null, elements);
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

    private _saveElement(file: string, element: IListElement, callback: (error?: any) => void): void {
        if (element === null) {
            return callback(new Error('object is null so it wasn\'t saved'));
        }
        try {
            return this.saveElementNoChecks(file, element, callback);
        } catch (err) {
            return callback(err);
        }
    }

    private saveElementNoChecks(file: string, element: IListElement, callback: (error?: any) => void) {
        this.setupJsonFile(file, (error?: any) => {
            if (error) {
                return callback(error);
            }
            return this.updateJson(file, element, element.key, callback);
        });
    }

    private setupJsonFile(file: string, callback: (error?: any) => void): void {
        fse.exists(file, async (exists: boolean) => {
            if (exists) {
                return callback(null);
            }
            await fse.createFile(file);
            return callback(null);
        });
    }

    private updateJson(file: string, obj: any, key: string, callback: (error?: any) => void): void {
        fse.readJSON(file, async (error: Error, jsonData: any) => {
            jsonData = jsonData || { };
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
readOutDataService();
//testDataService();*/
