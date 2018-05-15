
import * as fse from 'fs-extra';

export class DownloadService {

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
    public reloadPicture(url: string, regex: RegExp, destFolder: string): void {
        const get = require('get-content');
        get.get(url).then((body) => {
            let urls = body.match(regex);
            if(!urls || urls.length < 1) {
                console.log('no picture found on url:', url);
                return;
            }
            this.downloadImages([urls[0]], `${destFolder}`);
        }).catch((err) => {
            console.log('downlaodService: 32:: ', err);
        });
    }
}
