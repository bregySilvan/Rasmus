import { IElement, IBoard } from "../../../../interfaces";
import { Observable } from 'rxjs';
import { IHost } from '../state/network.reducer';
import { Response } from '@angular/http';


export interface IDatabaseService {

    getElements(host: string, keys: string[]): Observable<IElement[]>;

    getAllElements(host: string): Observable<IElement[]>;

    saveElements(host: string, elements: IElement[]): void;

}
