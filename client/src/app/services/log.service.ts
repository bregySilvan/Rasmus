import { Injectable } from '@angular/core';

declare var window, console: any;

@Injectable()
export class LogService {

  public warn(...text: any[]): void {
    console.warn(...text);
  }y

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
