import { RouterService } from './router.service';
import { RequestService } from './request.service';
import { ElementService } from './element.service';
import { LogService } from './log.service';
import { NetworkDetectionService } from './network-detection.service';

export const RASMUS_PROVIDERS = [RouterService, RequestService, ElementService, LogService, NetworkDetectionService];
