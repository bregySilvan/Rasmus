import { IListElement, ElementTypes } from '../../interfaces';
import * as fse from 'fs-extra';

export class DataService {

    private elementFilePath = '../var/elements.json';

    constructor() {

    }

    public async saveElement(element: IListElement): Promise<void> {
        if (element === null) {
            return Promise.reject(new Error('element is null so it wasn\'t saved'));
        }
        this.setupJsonFile(this.elementFilePath).catch((error: Error) => {
            return Promise.reject(error);
        }).then(() => {
            setTimeout(() => {
                return this.updateOrAppendJson(this.elementFilePath, element, element.key);
            }, 4000);
        });
    }

    private async setupJsonFile(file: string): Promise<void> {
        fse.exists(file, (exists: boolean) => {
            console.log('isExist file: ?= ', exists);
            if (exists) {
                return Promise.resolve();
            }
            fse.createFileSync(file);
            fse.writeFileSync(file, {});
            return Promise.resolve();


         //   fse.createFile(file).then(() => {
         //       console.log('file created');
          //      return fse.writeJson(file, {});
         //   }).catch(Promise.reject);

       //     return Promise.resolve();
           /* fse.outputJSON(file, { name: 'silvan'}, (error: Error) => {
                console.log('outputJson is done...');
                if(error) {
                    console.log(error);
                    return Promise.reject(error);
                }
                return Promise.resolve();
            });*/
        });
    }

    private async updateOrAppendJson(file: string, obj: any, key: string): Promise<void> {

        fse.readJSON(file, (error: Error, jsonData: any) => {
            console.log('received jsondata:', jsonData);
            jsonData.key = obj;
            fse.writeJson(file, jsonData, (error: Error) => {
                if(error) {
                    // logger.log(error);
                    return Promise.reject(error);
                }
                return Promise.resolve();
            });
        });
    }

    //  constructor(private elementFilePath: string) {
    // @toDo: take filepaths from constructor.
    // }
}

let service: DataService = new DataService();

service.saveElement({key: 'first key', type: ElementTypes.advertisement});
service.saveElement({key: 'second key', type: ElementTypes.advertisement});
service.saveElement({key: 'third key', type: ElementTypes.advertisement});
