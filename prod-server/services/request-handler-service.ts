import { Request } from 'express';
import { IElement, ElementTypes, IBoard } from '../../interfaces';
import * as express from 'express';
import { DataService } from './data-service';
import * as _ from 'lodash';
import { LOCAL_ADDRESS, DEFAULT_PORT, LOCATIONS } from '../../config';
import { CustomRouter } from '../classes/router';
import { RELOAD_PICTURES_INTERVAL_MS, PICTURE_CHANGE_INTERVAL_MS, FULL_SITE_ADDRESSES } from '../prod-server.conf';

export class RequestHandlerService {

    private dataService: DataService;
    private activePictureRoutes: string[] = [];

    public constructor() {
        this.dataService = new DataService();
    }

    private _respond(res: express.Response, responseInfo: { response: any, error?: Error }, responseStati: { bad: number, good: number },
        next: express.NextFunction, headers: string[]) {
        let response, status;
        if (responseInfo.error) {
            status = responseStati.bad;
            response = responseInfo.error;
        } else {
            status = responseStati.good;
            response = responseInfo.response;
        }

        headers.push('Access-Control-Allow-Origin: https://steinbock77.ch');
        console.log('responding to request: ');
        console.log('status:', status);
        console.log('response: ', response);

        res.header(headers.join(','));
        res.status(200);
        res.write(response);
        res.end();

        next();
    }

    public onStartShow(req: express.Request, res: express.Response, next: express.NextFunction) {

        let message = `<html>
        <head>
        <title>Title of the document</title>
        <script>
        document.env = {};
        document.env.currentIndex = 0;
        document.env.isUpdating = false;

        function createIframe(url) {
            var ifrm = document.createElement("iframe");
            ifrm.setAttribute("src", url);
            ifrm.style.width = "100%";
            ifrm.style.height = "100%";
            document.body.innerHTML = "";
            document.body.appendChild(ifrm);
        }

        function createPicture(url) {
            var pic = document.createElement("img");
            pic.setAttribute("src", url);
            pic.style.height = "100%";
            document.body.innerHTML = "";
            document.body.appendChild(pic);
        }

        function showNextPicture() {
            
            if(document.env.isUpdating) {
                return;
            }

            if(document.env.currentIndex >= document.env.displayInfos.length) {
                document.env.currentIndex = 0;
            }

            var picEl = document.getElementById('activePicture');
            var iframeEl = document.getElementById('activeIFrame');

            var displayInfo = document.env.displayInfos[document.env.currentIndex];
            document.env.currentIndex++;

            if(!displayInfo || !displayInfo.type || !displayInfo.url) {
                showNextPicture();
            } else if(displayInfo.type === 'picture') {
                var serverUrl = 'http://localhost:5001/picture';
                var imageUrl = serverUrl+displayInfo.url;
                createPicture(imageUrl);
                
            } else if(displayInfo.type === 'site') {
                createIframe(displayInfo.url);
            } else {
                showNextPicture();
            }
        }

        function updatePictureRoutes() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var displayInfos = JSON.parse(xhttp.responseText);
                    console.log('displayInfos::', displayInfos );
                    document.env.displayInfos = displayInfos.filter(function(info) {
                        return !!info;
                    });
                }
                document.env.isUpdating = false;
            };
            xhttp.open("GET", "http://${LOCAL_ADDRESS}:${DEFAULT_PORT}/${LOCATIONS.pictureRoutes}", true);
            xhttp.send();
            document.env.isUpdating = true;
        }

        function startShow() {
            window.setInterval(updatePictureRoutes, ${RELOAD_PICTURES_INTERVAL_MS});
            updatePictureRoutes();
            window.setTimeout(function() {
                showNextPicture();
                window.setInterval(showNextPicture, ${PICTURE_CHANGE_INTERVAL_MS});
            }, 2000);
            
        }
        
        startShow();
        
        </script>
        </head>
        
        <body style="overflow: hidden">
        
        <img height="100%" id="activePicture"><img>
   
        <iframe id="activeIFrame" width="100%" height="100%"></iframe>
        
        </body>
        
        </html>`;





        let responseInfo = { response: message, error: null };
        let responseStati = { bad: 403, good: 200 };
        let headers = ['Content-Type: text/html'];
        this._respond(res, responseInfo, responseStati, next, headers);
    }
    public onGetScripts(req: express.Request, res: express.Response, next: express.NextFunction) {
        let message = `function foo() { alert('bar'); }`
        let responseInfo = { response: message, error: null };
        let responseStati = { bad: 403, good: 200 };
        let headers = ['Content-Type: text/html'];
        this._respond(res, responseInfo, responseStati, next, headers);
    }

    public onGetPicture_$id(req: express.Request, res: express.Response, next: express.NextFunction) {
        let pictureName = '/' + req.params.id;
        let error = null;
        let picturePath = this.activePictureRoutes.find(path => path.substring(path.lastIndexOf('/')) === pictureName);

        if (!picturePath) {
            error = 'PICTURE NOT FOUND::';
        }
        let message = this.dataService.readPicture(picturePath);
        let responseInfo = { response: message, error: null };
        let responseStati = { bad: 403, good: 200 };
        let headers = ['Content-Type: image/gif'];
        this._respond(res, responseInfo, responseStati, next, headers);
    }

    public onGetPictureRoutes(req: express.Request, res: express.Response, next: express.NextFunction) {
        let displayInfos: { type: 'picture' | 'site', url: string }[]  = [];

        let activeRoutes =  this.activePictureRoutes.map(route => route.substring(route.lastIndexOf('/')));
        activeRoutes.forEach(route => displayInfos.push({url: route, type: 'picture'}));
        FULL_SITE_ADDRESSES.forEach(url => displayInfos.push({url: url, type: 'site'}));

        let message = JSON.stringify(displayInfos);
        let responseInfo = { response: message, error: null };
        let responseStati = { bad: 403, good: 200 };
        let headers = ['Content-Type: text/html'];
        this._respond(res, responseInfo, responseStati, next, headers);
    }

    public addPictureRoutes(folder: string) {
        this.dataService.listFileNames(folder, ['.jpg', '.gif', '.png'], (err: any, files: string[]) => {
            files.forEach(file => {
                this.activePictureRoutes.push(`${folder}/${file}`);
            });
        });
    }

    public onGetShow(req: express.Request, res: express.Response, next: express.NextFunction) {


        let message = `<html>
        <head>
        <title>Title of the document</title>
        <script src="http://${LOCAL_ADDRESS}:5001/scripts"></script>
        <script>function onClick() { window.setTimeout(function() { foo(); }, 3000);  }</script>
        </head>
        
        <body>
        
        <p><button onclick="onClick()">click me</button></p>
        <p><img src="http://${LOCAL_ADDRESS}:5001/picture"</p>

        
        </body>
        
        </html>`
        let responseData = ``;
        let responseInfo = { response: message, error: null };
        let responseStati = { bad: 403, good: 200 };
        let headers = ['Content-Type: text/html'];
        this._respond(res, responseInfo, responseStati, next, headers);
    }


    /*
        // payload: { element: IListElement }
        public onPostElements(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.warn('onPostElementèèèè!!!!!');
            
            // console.warn(req);
            //   console.warn('req.query', JSON.stringify(req.query));
            //   console.warn('req.body', JSON.stringify(req.body));
            //   console.warn('req.params', JSON.stringify(req.params));
    
            let elements: IElement[] = req.body;
            this.dataService.saveElements(elements, (error: Error) => {
                let responseData = 'saved element Successfully';
                let responseInfo = { response: responseData, error: error };
                let responseStati = { bad: 403, good: 200 };
                this._respond(res, responseInfo, responseStati, next);
            });
        }
    
        public onGetIsAlive(req: express.Request, res: express.Response, next: express.NextFunction) {
            let responseInfo = { response: { isAlive: true }, error: null };
            let responseStati = { good: 200, bad: 400 };
            this._respond(res, responseInfo, responseStati, next);
        }
    
        // payload: { keys?: string }
        public onGetElements(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log('req.query:: ', req.query);
            let keys: string[] = Object.keys(req.query).map((key) => req.query[key]);
            this.dataService.getElements(keys, (error: Error, elements: IElement[]) => {
                let responseData = elements;
                let responseInfo = { response: responseData, error: error };
                let responseStati = { bad: 403, good: 200 };
                this._respond(res, responseInfo, responseStati, next);
            });
        }
    
        // payload: { keys?: string }
        public onGetBoards(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log('req.query:: ', req.query);
            let keys: string[];
            if (req.query) {
                keys = Object.keys(req.query).map((key) => req.query[key]);
            }
            this.dataService.getBoards(keys, (error: Error, boards: IBoard[]) => {
                let responseData = boards;
                let responseInfo = { response: responseData, error: error };
                let responseStati = { bad: 403, good: 200 };
                this._respond(res, responseInfo, responseStati, next);
            });
        }
    }
    
    
    */
}
