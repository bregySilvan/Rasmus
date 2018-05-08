import { RouterService } from './router.service';
import { RequestService } from './request.service';
import { ElementService } from './element.service';
import { LogService } from './log.service';
import { NetworkService } from './network.service';
import { DataService } from './data.service';
import { DragService } from './drag.service';
import { KeyService } from './key.service';
import { InitService } from './init.service';


export const RASMUS_PROVIDERS = [
  RouterService,
  RequestService,
  ElementService,
  LogService,
  NetworkService,
  DataService,
  DragService,
  KeyService,
  InitService
];
