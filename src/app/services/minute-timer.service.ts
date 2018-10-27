import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MinuteTimerService {

  private second = 1000; // interval is defined in 'ms'
  private minute = this.second * 60;

  public currentTime: Date = new Date();

  constructor() {
    window.setInterval(() => {
      this.currentTime = new Date();
    }, this.minute);
  }
}
