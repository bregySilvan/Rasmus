
import * as fse from 'fs-extra';
import * as XMLHttpRequest from 'xmlhttprequest';

export class IntervalService {

    public downloadImages(urls: string[], dest: string) {
        const download = require('images-downloader').images;

        // The file will be downloaded to this directory. For example: __dirname + '/mediatheque'
        const dest = './var'


        download([url], dest).then(result => console.log('Images downloaded', result);	) 
    .catch(error => console.log("downloaded error", error))

    public reloadPicture(url: string, regex: RegExp | null): void {

        const { linkType, get } = require("get-content");
        const url = 'http://andral.kiwi';
        const type = linkType(url);
 
        console.log(type); // 'url'

        get(url).then((data) => {
            console.warn('received pic data: ', data);
            fse.writeFile('./steinbock.png',data,);
        }).catch((err) => {
            console.log(err);
        });


      //  this.get(url, (err: any, body: string) => {
        //    if(err) {
        //        return console.log(err);
        //    }

     // "//"      let matches = body.match(regex);
        //    if(matches.length) {
         //   }
  //      });
    }


    private get(url: string, cb:(err: any, data: any) => void): void {
        var xhttp = new XMLHttpRequest.XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    return cb(null, xhttp.responseText);
                } 
            };
            xhttp.open("GET", url, true);
            xhttp.send();

          setTimeout(() => {
            //  cb('GET on ' + url + 'failed', '');
          }, 6 * 1000);
    }

    
}


var picUrl = 'https://www.steinbock77.ch/webcam_29/bilder/mega12.jpg';
var steinBockUrl = 'https://www.steinbock77.ch/webcam_14/000haupt_l.php';
var a: IntervalService = new IntervalService();
a.reloadPicture(picUrl, null);
//a.reloadPicture(steinBockUrl, null);