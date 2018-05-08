import { Injectable } from '@angular/core';

declare var console: any;

@Injectable()
export class LogService {

  public warn(...text: any[]): void {
    console.warn(...text);
  }

  public log(...text: any[]): void {
    console.log(...text);
  }

  public error(...text: any[]): void {
    console.error(...text);
  }

  public info(...text: any[]): void {
    console.info(...text);
  }
}
