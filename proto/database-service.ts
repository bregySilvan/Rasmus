
import * as fse from 'fs-extra';
import { IAdvertisement, IBoard } from '../../client/src/app/interfaces';

// a service which provides the interface for storing data.
// let's put all data storage into this class
// so we can easily migrate to a real database
// when application is really used.
export class DatabaseService {

    private activeElementFilePath = '../var/active-elements.json';
    private elementsFilePath = '../var/elements.json';
    private boardsFilePath = '../var/boards.json';


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
        return this.readAdvertisementFile().then((advertisements: IAdvertisement[]) => {
            if(keys) {
                advertisements = advertisements
                    .filter((advertisement: IAdvertisement) => keys.indexOf(advertisement.key) > -1);
            }
            return Promise.resolve(advertisements);
        });
    }

    public listActiveBoard(): Promise<IAdvertisement[]> {
        return this.readActiveAdvertisementFile().then((advertisements: IAdvertisement[]) => {
            return Promise.resolve(advertisements);
        }).catch((err) => {
            console.log(err);
            return Promise.resolve([]);
        });
    }

    public addAdvertisement(advertisement: IAdvertisement) {
        if(advertisement == null)  return;
        this.readAdvertisementFile().then((advertisements: IAdvertisement[]) => {
            advertisements.push(advertisement);
            this.updateAdvertisementFile(advertisements);
        });
    }

    public addBoard(board: IBoard): Promise<void> {
        this.readBoardsFile().then((boards: IBoard[]) => {
            boards.push(board);
            this.updateBoardsFile(boards);
        });
    }

    public deleteActiveAdvertisements(key: string) {
        this.readActiveAdvertisementFile().then((advertisements: IAdvertisement[]) => {
            advertisements = advertisements.filter((advertisement: IAdvertisement) => advertisement.key === key);
            this.updateActiveAdvertisementFile(advertisements);
        });
    }

    public deleteAdvertisement(key: string) {
        this.readAdvertisementFile().then((advertisements: IAdvertisement[]) => {
            advertisements = advertisements.filter((advertisement: IAdvertisement) => advertisement.key === key);
            this.updateAdvertisementFile(advertisements);
        });
    }

    public deleteBoard(id: string) {
        this.readBoardsFile().then((boards: IBoard[]) => {
            boards = boards.filter((board: IBoard) => board.id !== id);
            this.updateBoardsFile(boards);
        });
    }
    // always deletes whuole file because we don't wanna wrong ads in there.
    // in other places it's better to keep maybe redundant values.
    public updateActiveAdvertisements(advertisements: IAdvertisement[]) {
        this.updateActiveAdvertisementFile(advertisements);
    }

    public updateAdvertisement(newAdvertisement: IAdvertisement) {
        this.readAdvertisementFile().then((advertisements: IAdvertisement[]) => {
            this.updateAdvertisementFile(advertisements.map((advertisement: IAdvertisement) => {
                if(advertisement.key === newAdvertisement.key) {
                    return newAdvertisement;
                }
                return advertisement;
            }));
        });
    }

    public updateBoard(newBoard: IBoard) {
        this.readBoardsFile().then((boards: IBoard[]) => {
            this.updateBoardsFile(
                boards.map((board: IBoard) => {
                if(board.id === newBoard.id) {
                    return newBoard;
                }
                return board;
            }));
        });
    }

    private async updateBoardsFile(boards: IBoard[]) {
        if(!fse.existsSync(this.boardsFilePath)) {
            fse.createFileSync(this.boardsFilePath);
        }
        return fse.writeJsonSync(this.boardsFilePath, boards);
    }

    private updateAdvertisementFile(advertisements: IAdvertisement[]) {
     //   if(fse.existsSync(this.elementsFilePath)) {
    //        fse.removeSync(this.elementsFilePath);
    //    }
        fse.writeJsonSync(this.elementsFilePath, advertisements);
    }

    private updateActiveAdvertisementFile(advertisements: IAdvertisement[]) {
     //   if(fse.existsSync(this.activeElementFilePath)) {
       //     fse.removeSync(this.activeElementFilePath);
     //   }
        fse.writeJsonSync(this.activeElementFilePath, advertisements);
    }

    private readAdvertisementFile(): Promise<IAdvertisement[]> {

        return fse.readFile(this.elementsFilePath)
            .then((data: Buffer) => {
                return Promise.resolve(<IAdvertisement[]>(JSON.parse(data.toString())));
            }).catch((err: any) => {
                console.log(err);
                return Promise.resolve([]);
            });
    }

    private readBoardsFile(): Promise<IBoard[]> {
        return fse.readFile(this.boardsFilePath)
            .then((data: Buffer) => {
                return Promise.resolve(<IBoard[]>(JSON.parse(data.toString())));
            }).catch((err: any) => {
                console.log(err);
                return Promise.resolve([]);
            });
    }

    private readActiveAdvertisementFile(): Promise<IAdvertisement[]> {
        return fse.readFile(this.activeElementFilePath)
            .then((data: Buffer) => {
                return Promise.resolve(<IAdvertisement[]>(JSON.parse(data.toString())));
            }).catch((err: any) => {
                console.log(err);
                return Promise.resolve([]);
            });
    }
}

var a: DatabaseService = new DatabaseService();

a.addBoard({ keys: ['k1', 'k2', 'k3'], id: 'myLovelyId' });
a.addBoard({ keys: ['kk1', 'kk2', 'kk3'], id: 'id2' });
a.addBoard({ keys: ['kkk111', 'kkk222', 'kk3333'], id: 'Amazing shit id' });

//a.updateBoard({ keys:['sd'], id: 'Amazing shit id'});
function printListedBoards() {
    a.listBoards().then((boards: IBoard[]) => {
        boards.forEach(console.log);
    });
}
setTimeout(printListedBoards, 5000);