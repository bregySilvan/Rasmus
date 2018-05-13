import { SOURCE_FOLDER_PATH, STEINBOCK_SITES, UPDATE_PICTURES_INTERVAL_MS } from '../prod-server.conf';
import * as fse from 'fs-extra';
import * as base64Img  from 'base64-img';
import { DownloadService } from './download-service';
import { DataService } from '../../client/src/app/services/data.service';

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
    private activePictures: IBockInfo[] = [];

    public runSteinbockService() {
        let urls = STEINBOCK_SITES;
        let pictureFolder = SOURCE_FOLDER_PATH;
        this.activePictures = [];
        let i = 0;
        urls.forEach(url => this.activePictures.push({
            picturePath: '',
            url: url,
            id: i++
        }));
        this._updateSteinbockPics(this.activePictures, pictureFolder);
        setInterval(() => {
            this._updateSteinbockPics(this.activePictures, pictureFolder);
        }, UPDATE_PICTURES_INTERVAL_MS);

    }

    private _deletePictures(folder: string) {
        let regex = this.steinbockPictureFileNameRegex;
        this.dataService.listFileNames(folder, ['.jpg', '.gif', 'png'], (err: any, fileNames: string[]) => {
            if(err) {
                return;
            }
            fileNames.forEach(fileName => {
                if(fileName.matches(regex).length > 0) {
                    let faqPath = `${folder}/${fileName}`;
                    console.log('removing:', faqPath);
                    fse.remove(faqPath);
                }    
            });
        });
    }

    private _updateSteinbockPics(infos: IBockInfo[], pictureFolder: string) {
        
        this.activePictures = infos.map(info => {
            if(info.picturePath.length > 0) {
                console.log('remov file: ' + info.picturePath);
                fse.remove(info.picturePath);
                info.picturePath = '';
            }
            this.downloadService.reloadPicture(info.url, this.steinbockPictureRegex, pictureFolder, (err: any, fileName: string) => {
                if(err) {
                    console.log(err);
                    return info;
                }
                info.picturePath = `${pictureFolder}/${fileName}`;
                console.log('new picture path:: ', info.picturePath);
            });
            return infos;
        });
    }

    constructor() {
        this.downloadService = new DownloadService();
        this.dataService = new DataService();
    }
}
