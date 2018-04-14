import { Injectable } from '@angular/core';

declare var window, console: any;

@Injectable()
export class LogService {

  public warn(...text: any[]) {
    console.warn(...text);
  }

  public log(...text: any[]) {
    console.log(...text);
  }

  public error(...text: any[]) {
    console.error(...text);
  }

  public info(...text: any[]) {
    console.info(...text);
  }
}
