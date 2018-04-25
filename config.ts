

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
   // "192.168.1.254"
  //  "10.1.34.116"
   '10.1.34.106'
];

export const LOCAL_ADDRESS = '10.1.34.106';
//export const LOCAL_ADDRESS = '10.1.34.116';
export const LOCAL_SUBNET_MASK = "255.255.255.0";
export const KEEP_ALIVE_INTERVAL_MS = 13 * 1000;
export const HOST_DETECTION_INTERVAL_MS = 50 * 1000;
export const DEFAULT_PORT = 5001;

// 2 parallel requests will be exectued at least with any configuration.
export const PARALLEL_REQUEST_LIMIT = 500;


