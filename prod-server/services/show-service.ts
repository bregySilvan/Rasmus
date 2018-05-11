import { SOURCE_FOLDER_PATH } from '../prod-server.conf';
import * as fse from 'fs-extra';
import * as base64Img  from 'base64-img';


export class ShowService {

    public buildShowData() {
        let path = SOURCE_FOLDER_PATH;
        // read source path
        
        // create array with all picture paths in it.
    }

    

}
console.warn(base64Img);
var destPath = '../var';
var data = base64Img.base64Sync('../var/question1.jpg');
//console.warn('data:: ', data);
var filepath = base64Img.imgSync(data, destPath, 'question-dest');

//console.log('img:: ', image);