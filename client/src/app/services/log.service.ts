import { Injectable } from '@angular/core';

declare var console: any;

@Injectable()
export class LogService {

  public warn(callee: Object, ...text: any[]): void {
    this._print(callee, 'warn', ...text);
  }

  public log(callee: Object, ...text: any[]): void {
    this._print(callee, 'log', ...text);
  }

  public error(callee: Object, ...text: any[]): void {
    this._print(callee, 'error', ...text);
  }

  public info(callee: Object, ...text: any[]): void {
    this._print(callee, 'info', ...text);
  }

  private _print(callee: Object, method: 'warn' | 'log' | 'error' | 'info', ...text) {
    console[method](callee.constructor.name,'->', ...text);
  }
}
