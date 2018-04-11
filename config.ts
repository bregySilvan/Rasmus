
export interface ILocationMap {
    element_$id: string;
    element: string;
    elements: string;
    board_$id: string;
    boards: string;
    activeBoard: string;
}

export const locations: ILocationMap = {
    element: 'element',
    element_$id: 'element/:id',
    elements: 'elements',
    board_$id: 'board/:id',
    boards: 'boards',
    activeBoard: 'active-board'
}

export const DEFAULT_PORT = 5001;

