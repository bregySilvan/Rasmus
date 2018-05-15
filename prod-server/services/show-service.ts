import { SOURCE_FOLDER_PATH, UPDATE_STEINBOCK_PICTURE_SERVER, STEINBOCK_SITES } from '../prod-server.conf';
import * as fse from 'fs-extra';
import * as base64Img  from 'base64-img';
import { DownloadService } from './download-service';
import { DataService } from './data-service';
//import { DataService } from '../../client/src/app/services/data.service';

interface IBockInfo {
    picturePath: string;
    url: string;
    id: string;
}

export class ShowService {

    private steinbockPictureRegex = /https:\/\/www.steinbock77.ch\/webcam_[0-9]+\/bilder\/mega[0-9]+\.(jpg|png|gif)/gi;
    private steinbockPictureFileNameRegex = /image_[0-9]+\.(jpg|gif|png)/gi;

    private downloadService: DownloadService;
    private dataService: DataService;
    private activeSteinbockSites: IBockInfo[] = [];

    public runSteinbockService() {
        let urls = STEINBOCK_SITES;
        let pictureFolder = SOURCE_FOLDER_PATH;
        this.activeSteinbockSites = [];
        let i = 0;
        urls.forEach(url => {
            if(url.toUpperCase().indexOf('STEINBOCK77') > -1) {
                this.activeSteinbockSites.push({
                    picturePath: '',
                    url: url,
                    id: ''+i++
                });
            }
        });

        this._updateSteinbockPics(this.activeSteinbockSites, pictureFolder);
        setInterval(() => {
            this._updateSteinbockPics(this.activeSteinbockSites, pictureFolder);
        }, UPDATE_STEINBOCK_PICTURE_SERVER);

    }

    private _deletePictures(folder: string) {
        let regex = this.steinbockPictureFileNameRegex;
        this.dataService.listFileNames(folder, ['.jpg', '.gif', '.png'], (err: any, fileNames: string[]) => {
            if(err) {
                return;
            }
            fileNames.forEach(fileName => {
                if(fileName.match(regex).length > 0) {
                    let faqPath = `${folder}/${fileName}`;
                    console.log('removing:', faqPath);
                    fse.removeSync(faqPath);
                }
            });
        });
    }

    private _updateSteinbockPics(infos: IBockInfo[], pictureFolder: string) {
        this._deletePictures(pictureFolder);
        infos.forEach(info => this.downloadService.reloadPicture(info.url, this.steinbockPictureRegex, pictureFolder));
    }

    constructor() {
        this.downloadService = new DownloadService();
        this.dataService = new DataService();
    }
}
