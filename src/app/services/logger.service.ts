import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  public log(message: string, ...args): void {
    this.write('  LOG', message, ...args);
  }
  public info(message: string, ...args): void {
    this.write(' INFO', message, ...args);
  }
  public error(message: string, ...args): void {
    this.write('ERROR', message, ...args);
  }

  private write(logname: string, message: string, ...args): void {
    console.log(`${new Date().toTimeString()} ${logname}| ${message}`, ...args);
  }
}

