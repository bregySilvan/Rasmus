
import * as fse from 'fs-extra';
import { IAdvertisement, IBoard } from '../../client/src/app/interfaces';

// a service which provides the interface for storing data.
// let's put all data storage into this class
// so we can easily migrate to a real database
// when application is really used.
export class DatabaseService {

    private activeElementFilePath = 'var/active-elements.json';
    private elementsFilePath = 'var/elements.json';
    private boardsFilePath = 'var/boards.json';

    /*
    export const locations: ILocationMap = {
        element_$id: '/element/:id',
        elements: 'board',
        board_$id: '/board/:id',
        boards: '/boards',
        activeBoard: '/active-board'
    }
    */

    public listBoards(ids?: string[]): Promise<IBoard[]> {
        return this.readBoardsFile().then((boards: IBoard[]) => {
            if(ids) {
                boards = boards.filter((board: IBoard) => ids.indexOf(board.id) > -1);
            }
            return Promise.resolve(boards);
        });
    }

    public listAdvertisements(keys?: string[]): Promise<IAdvertisement[]> {
        return this.readElementsFile().then((advertisements: IAdvertisement[]) => {
            if(keys) {
                advertisements = advertisements
                    .filter((advertisement: IAdvertisement) => keys.indexOf(advertisement.key) > -1);
            }
            return Promise.resolve(advertisements);
        });
    }

    public listActiveBoard(): Promise<IAdvertisement[]> {
        return this.readActiveElementsFile().then((advertisements: IAdvertisement[]) => {
            return Promise.resolve(advertisements);
        }).catch((err) => {
            console.log(err);
            return Promise.resolve(err);
        });
    }

    public addElement(key: string) {

    }

    public addBoard(board: IBoard) {
        this.readBoardsFile().then((boards: IBoard[]) => {
            boards.push(board);
            this.updateBoardsFile(boards);
        });
    }

    public deleteElement(key: string) {

    }

    public deleteBoard(id: string) {

    }

    public updateActiveAdvertisements(advertisements: IAdvertisement[]) {

    }

    public updateAdvertisement(advertisement: IAdvertisement) {

    }

    public updateBoard(board: IBoard) {

    }

    private updateBoardsFile(boards: IBoard[]) {
        fse.writeJson(this.boardsFilePath, boards);
    }

    private updateAdvertisementFile(advertisements: IAdvertisement[]) {
        fse.writeJson(this.elementsFilePath, advertisements);
    }

    private updateActiveAdvertisementFile(advertisements: IAdvertisement[]) {
        fse.writeJson(this.activeElementFilePath, advertisements);
    }

    private readElementsFile(): Promise<IAdvertisement[]> {
        return fse.readFile(this.elementsFilePath)
            .then((data: Buffer) => {
                return Promise.resolve(<IAdvertisement[]>(JSON.parse(data.toString())));
            }).catch((err: any) => {
                return Promise.resolve([]);
            });
    }

    private readBoardsFile(): Promise<IBoard[]> {
        return fse.readFile(this.boardsFilePath)
            .then((data: Buffer) => {
                return Promise.resolve(<IBoard[]>(JSON.parse(data.toString())));
            }).catch((err: any) => {
                return Promise.resolve([]);
            });
    }

    private readActiveElementsFile(): Promise<IAdvertisement[]> {
        return fse.readFile(this.activeElementFilePath)
            .then((data: Buffer) => {
                return Promise.resolve(<IAdvertisement[]>(JSON.parse(data.toString())));
            }).catch((err: any) => {
                return Promise.resolve([]);
            });
    }
}

var a: DatabaseService = new DatabaseService();
a.addBoard({ keys: ['k1', 'k2', 'k3'], id: 'myLovelyId' });
a.addBoard({ keys: ['kk1', 'kk2', 'kk3'], id: 'id2' });
a.addBoard({ keys: ['kkk111', 'kkk222', 'kk3333'], id: 'Amazing shit id' });

function printListedBoards() {
    a.listBoards().then((boards: IBoard[]) => {
        boards.forEach(console.log);
    });
}
setTimeout(printListedBoards, 2000);