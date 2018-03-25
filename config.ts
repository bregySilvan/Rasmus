
export interface ILocationMap {
    element_$id: string;
    elements: string;
    board_$id: string;
    boards: string;
    activeBoard: string;
}

export const locations: ILocationMap = {
    element_$id: '/element/:id',
    elements: 'board',
    board_$id: '/board/:id',
    boards: '/boards',
    activeBoard: '/active-board'
}

