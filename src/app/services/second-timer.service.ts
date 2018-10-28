import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecondTimerService {

  private second = 1000; // interval is defined in 'ms'

  public currentTime: Date = new Date();

  constructor() {
    window.setInterval(() => {
      this.currentTime = new Date();
    }, this.second);
  }
}
