import { IElement, ElementTypes, IBoard, IAdvertisement } from '../../interfaces';
import * as fse from 'fs-extra';
import { QueueService } from './queue-service';
import { SOURCE_FOLDER_PATH } from '../prod-server.conf';

export class DataService {

    private elementsFilePath = './var/elements.json';
    private boardsFilePath = './var/boards.json';
   // private picturesFilePath = SOURCE_FOLDER_PATH;
   private picturesFilePath = 'D:/Github/rasmus2/prod-server/var/question1.jpg';
//

    private queueService: QueueService;

    constructor() {
        this.queueService = new QueueService();
    }

    public listFileNames(path: string, endings: string[], callback: (error: any, filenames: string[]) => void) {
        fse.readdir(path, (error, files) => {
            if(error) {
                return callback(error, []);
            }
            if(endings) {
                endings = endings.map(ending => ending.startsWith('.') ? ending : '.'+ending);
                files = files.filter(file =>  {
                    let currentEnding = file.substring(file.lastIndexOf('.'));
                    return endings.includes(currentEnding);
                });
            }
            return callback(null, files);
        })
    }

    public readPicture(path: string): any {
        return fse.readFileSync(path);
    }

    public getBoards(keys: string[], callback: (error: Error, boards: IBoard[]) => void) {
        this._getQueued(this.boardsFilePath, keys, (error: any, data: any) => {
            if(error) {
                return callback(error, []);
            }
            callback(error, Object.keys(data).map(key => <IBoard>data[key]));
        });
    }

    public getElements(keys: string[], callback: (error: Error, elements: IElement[]) => void): void {
        this._getQueued(this.elementsFilePath, keys, (error: any, data: any) => {
            if(error) {
                return callback(error, []);
            }
            callback(error, Object.keys(data).map(key => <IElement>data[key]));
        });
    }
    
    public saveElements(elements: IElement[], callback: (error: any) => void): void {
        console.warn('saving element on server::');
        this._saveQueued(this.elementsFilePath, elements, callback);
    }

    private _getQueued(filePath: string, keys: string[], callback: (error: any, data: any) => void) {
        this.queueService.addToQueue((next) => {
            this._get(filePath, keys, (err: any, data: any[]) => {
                callback(err, data);
                next();
            });
        });
    }

    private _saveQueued(filePath: string, elements: IElement[], callback: (error: any) => void) {
        this.queueService.addToQueue((next) => {
            this._save(filePath, elements, (err: any) => {
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

    private _save(file: string, elements: IElement[], callback: (error: any) => void): void {
        if (!elements || !elements.length) {
            return callback(new Error('no object given for save operation to file: ' + file));
        }
        try {
            return this._saveNoChecks(file, elements, callback);
        } catch (err) {
            return callback(err);
        }
    }

    private _saveNoChecks(file: string, elements: IElement[], callback: (error?: any) => void) {
        this._checkJsonFile(file, (error?: any) => {
            if (error) {
                return callback(error);
            }
            return this._updateJson(file, elements, callback);
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

    private _updateJson(file: string, objs: IElement[], callback: (error?: any) => void): void {
        fse.readJSON(file, async (error: Error, jsonData: any) => {
            jsonData = jsonData || {};
            objs.forEach(obj => jsonData[obj.key] = obj);
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



