import { RouterModule, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class RouterService {

    public navigateTo(url: string) {
      // move to an effect later on.
      this.router.navigateByUrl(url);
    }

    constructor(private router: Router) {

    }
}
