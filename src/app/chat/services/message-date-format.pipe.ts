import {Pipe, PipeTransform} from '@angular/core';
import {Message} from '../models/message';

@Pipe({
  name: 'messageDateFormat',
  pure: true
})

export class MessageDateFormatPipe implements PipeTransform {

  public readonly  second =    1;
  public readonly  minute =   60 * this.second;
  public readonly  hour   =   60 * this.minute;
  public readonly  day    =   24 * this.hour;
  public readonly  week   =    7 * this.day;
  public readonly  month  =   30 * this.day;
  public readonly  year   =  364 * this.day;
  public readonly  decade =   10 * this.year
                          +  2.5 * this.day;

  transform(message: Message, refDate: Date = new Date()): string {
    if (refDate < message.createdAt) {
      refDate = message.createdAt;
    }
    const seconds = Math.floor(refDate.getTime() / 1000) - Math.floor(message.createdAt.getTime() / 1000);
    const result = this.evaluateTimeSpan(seconds, this.second * 2);
    return result;
  }

  private evaluateTimeSpan(seconds: number, minUnit: number): string {
    if (seconds < minUnit        ) { return 'a moment ago'; }
    if (seconds < this.minute    ) { return this.assembleTimeString(seconds, this.second, 'second'); }
    if (seconds < this.hour      ) { return this.assembleTimeString(seconds, this.minute, 'minute'); }
    if (seconds < this.day       ) { return this.assembleTimeString(seconds, this.hour  , 'hour'); }
    if (seconds < this.week      ) { return this.assembleTimeString(seconds, this.day   , 'day'); }
    if (seconds < this.month     ) { return this.assembleTimeString(seconds, this.week  , 'week'); }
    if (seconds < this.year      ) { return this.assembleTimeString(seconds, this.month , 'month'); }
    if (seconds < this.decade * 2) { return this.assembleTimeString(seconds, this.year  , 'year'); }
                                     return this.assembleTimeString(seconds, this.decade, 'decade');
  }

  private assembleTimeString(value: number, unitValue: number, unitName: string) {
    const outValue = Math.floor(value / unitValue);
    return `${outValue} ${unitName}${outValue !== 1 ? 's' : '' } ago`;
  }

}
