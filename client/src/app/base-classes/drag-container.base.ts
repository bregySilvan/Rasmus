import { DragService } from '../services/drag.service';
import { Input, OnInit } from '@angular/core';
import { IElement } from '../../../../interfaces';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import { IDragInfo } from '../state/drag.reducer';

export abstract class DragContainer implements OnInit {

    private _elements: IElement[] = [];
    public abstract getKey(): string;

    get elements() {
        return this._elements;
    }

    set elements(elements: IElement[]) {
        this._elements = elements;
    }

    ngOnInit() {
        this.dragService.register(this);
        this.store$.select(x => x.drag.draggableElements)
            .map(x => ({ keys: Object.keys(x), containers: x }))
            .map(x => ({ keys: x.keys.filter(key => key === this.getKey()), containers: x.containers }))
            .map(x => x.containers[x.keys[1]])
            // .distinctUntilChanged()
            .subscribe(elements => {
                this.elements = elements;
            });
    }

    constructor(private dragService: DragService,
        private store$: Store<IAppStore>) {
    }
}