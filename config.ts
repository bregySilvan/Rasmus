

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

export const PICTURE_LOCATION = 'D:\\Github\\rasmus2\\server\\pics';
export const NO_ITEM_KEY = 'THIS_IS_NOT_AN_ITEM_KEY';

export const LOCAL_ADDRESS = '192.168.1.254';
//export const LOCAL_ADDRESS = '192.168.1.254';
//export const LOCAL_ADDRESS = '10.1.34.116';
//export const LOCAL_ADDRESS = '10.1.38.110';

export const LOCAL_SUBNET_MASK = "255.255.255.0";
export const KEEP_ALIVE_INTERVAL_MS = 20 * 1000;
export const HOST_DETECTION_INTERVAL_MS = 62 * 1000;
export const DEFAULT_PORT = 5001;
export const AUTO_HOST_DETECTION = false;
export const AUTO_DATA_LOADING = false;
export const PARALLEL_REQUEST_LIMIT = 500;


export const SERVER_ADDRESSES = [
    LOCAL_ADDRESS
   // "192.168.1.254",
    //'10.1.38.110'
  //  "10.1.34.116"
];
