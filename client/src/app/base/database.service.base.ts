import { IListElement, IBoard } from "../../../../interfaces";
import { Observable } from 'rxjs';
import { IHost } from '../state/network.reducer';
import { Response } from '@angular/http';


export interface IDatabaseService {

    getElements(host: string, keys: string[]): Observable<IListElement[]>;

    getBoards(host: string, keys: string[]): Observable<IBoard[]>;

    getAllBoards(host: string): Observable<IBoard[]>;

    getAllElements(host: string): Observable<IListElement[]>;

    saveBoards(host: string, boards: IBoard[]): void

    saveElements(host: string, elements: IListElement[]): void;

}
