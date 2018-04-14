import { RequestService } from './request.service';
import { Injectable } from '@angular/core';


//net::ERR_CONNECTION_REFUSED

@Injectable()
export class NetworkDetectionService {


  constructor(private requestService: RequestService) {

  }

}
