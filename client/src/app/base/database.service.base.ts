import { IElement, IBoard } from "../../../../interfaces";
import { Observable } from 'rxjs';
import { IHost } from '../state/network.reducer';
import { Response } from '@angular/http';


export interface IDatabaseService {

    getElements(host: string, keys: string[]): Observable<IElement[]>;

    getBoards(host: string, keys: string[]): Observable<IBoard[]>;

    getAllBoards(host: string): Observable<IBoard[]>;

    getAllElements(host: string): Observable<IElement[]>;

    saveBoards(host: string, boards: IBoard[]): void

    saveElements(host: string, elements: IElement[]): void;

}
