
export interface ILocationMap {
    element_$id: string;
    element: string;
    elements: string;
    board_$id: string;
    boards: string;
    activeBoard: string;
    isAlive: string;
}

export const LOCATIONS: ILocationMap = {
    element: 'element',
    element_$id: 'element/:id',
    elements: 'elements',
    board_$id: 'board/:id',
    boards: 'boards',
    activeBoard: 'active-board',
    isAlive: 'is-alive'
}

export const SERVER_ADDRESSES = [
    "192.168.1.254"
];

export const LOCAL_ADDRESS = "192.168.1.254";
export const LOCAL_SUBNET_MASK = "255.255.255.0";
export const KEEP_ALIVE_INTERVAL = 7500;
export const DEFAULT_PORT = 5001;
export const PARALLEL_SIMILAR_REQUEST_LIMIT = 22;

// The amount of milliseconds which is waited for queued up requests
// to one location
export const GENERAL_REQUEST_DELAY_MS = 35;

