import { Injectable } from '@angular/core';

declare var window, console: any;

@Injectable()
export class LogService {

  public warn(...text: string[]) {
    console.warn(...text);
  }

  public log(...text: string[]) {
    console.log(...text);
  }

  public error(...text: string[]) {
    console.error(...text);
  }
}
