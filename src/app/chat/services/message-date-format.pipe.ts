import {Pipe, PipeTransform} from '@angular/core';
import {Message} from '../models/message';

@Pipe({
  name: 'messageDateFormat',
  pure: false
})

export class MessageDateFormatPipe implements PipeTransform {

  private second =    1;
  private minute =   60 * this.second;
  private hour   =   60 * this.minute;
  private day    =   24 * this.hour;
  private week   =    7 * this.day;
  private month  =   30 * this.day;
  private year   =  364 * this.day;
  private decade =   10 * this.year
                  + 2.5 * this.day;

  transform(message: Message, refDate: Date = new Date()): string {
    if (refDate < message.createdAt) {
      refDate = message.createdAt;
    }
    const seconds = Math.floor(refDate.getTime() / 1000) - Math.floor(message.createdAt.getTime() / 1000);
    const result = this.evaluateTimeSpan(seconds);
    return result;
  }

  private evaluateTimeSpan(seconds: number): string {
    if (seconds < this.minute    ) { return 'a moment ago'; }
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
