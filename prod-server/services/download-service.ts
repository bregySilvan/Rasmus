
import * as fse from 'fs-extra';

export class DownloadService {

    private rndName(): string {
        return '' + Date.now() + '_' + ('' + Math.random()).substring(4, 8);
    }

    // downloads and writes images
    public downloadImages(urls: string[], destFolder: string) {
        const download = require('images-downloader').images;
        console.log('destFolder: ', destFolder);
        download(urls, destFolder).then(data => {
            fse.writeFile(destFolder, data).then(x => console.log(x)).catch(err => console.log(err));
        }) 
        .catch(error => console.error('error when getting pic:', urls[0], error));
    }

    // loads content from provided url and downloads first match from regex
    public reloadPicture(url: string, regex: RegExp, destFolder: string, cb?: (err: any, newName: string) => void): void {
        const get = require('get-content');
        get.get(url).then((body) => {
            let urls = body.match(regex);
            if(!urls || urls.length < 1) {
                console.log('no picture found on url:', url);
                return;
            }
            let newName = `${this.rndName()}.jpg`;
            this.downloadImages([urls[0]], `${destFolder}`);
            if(cb) {
                cb(null, newName);
            }
        }).catch((err) => {
            if(cb) {
                cb(err, '');
            }
            console.log(err);
        });
    }
}
