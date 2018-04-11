import * as superagent from 'superagent';
import { locations, DEFAULT_PORT } from '../config';


function defaultResponseHandler(err: any, res: superagent.Response) {
    if(err) {
        console.log('request failed');
        if(err.notFound) {
            console.log('not found..');
        }
    } else {
        console.log('received some respone => {res.body} => ');
        console.log(res.text);
    }
};

function doGet(URL, payload) {
    console.log('get Request on URL: ' + URL);
    superagent.get(URL)
    .set('Accept', 'application/json')
    .query(payload)
    .end(defaultResponseHandler);
}

function doPost(URL, payload): void {
    console.log('post Request on URL: ' + URL);
    superagent
    .post(URL)
    .set('Accept', 'application/json')
    .query(payload)
    .end(defaultResponseHandler);
}


function testPostElement() {
    let listElement = { key: 'myFirstSentListElement', type: 'advertisement' };
    let url = `http://localhost:${DEFAULT_PORT}/${locations.element}`;
    doPost(url, listElement);
}

function testGetElements() {
    let payload = ['myFirstSentListElement'];
    let URL = `http://localhost:${DEFAULT_PORT}/${locations.elements}`;
    doGet(URL, payload);
}

//testPostElement();

testGetElements();

