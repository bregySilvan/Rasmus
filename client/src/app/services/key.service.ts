

import { Injectable } from '@angular/core';


@Injectable()
export class KeyService {

    constructor() {

    }

    public newKey(): string {
        // pls reimplement this using real random shit but should be fine for now
        return '' + Date.now() + '_' + ('' + Math.random()).substring(1, 7);
    }
}