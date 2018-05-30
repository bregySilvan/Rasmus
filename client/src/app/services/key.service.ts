

import { Injectable } from '@angular/core';
import { ElementTypes } from '../../../../interfaces';
import * as Config from '../../../../config';

//@todo move to config or similar file.
type KEY_TYPES = ElementTypes;

@Injectable()
export class KeyService {

    // @todo: move constants and keytypes to config or similar file..

    // for now we just use elementtypes for getting all elemetns with same type..
    private defaultKeySeparator = Config.DEFAULT_KEY_SEPARATOR;
    private allElementsKeyPraefix = Config.ALL_ELEMENTS_KEY_PRAEFIX;
    private defaultKeyLength = Config.DEFAULT_KEY_LENGTH;
    private noTypeKeyPraefix = Config.NO_TYPE_KEY_PRAEFIX;

    constructor() {

    }

    // @*todo: add sanitising so 
    public newKey(type: KEY_TYPES): string {
        // pls reimplement this using real random generator but should be fine for now
        switch (type) {
            case 'advertisement':
                return this.createAdvertisementsKey();
            default:
                return this.createNoTypeKey();
        }
    }

    private createAdvertisementsKey(): string {
        return this.allElementsKeyPraefix + this.defaultKeySeparator + this.randomString();
    }

    private createNoTypeKey(): string {
        return this.defaultKeyLength + this.defaultKeySeparator + this.randomString();
    }

    // @todo move function to utils
    private randomString(length: number = this.defaultKeyLength): string {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}