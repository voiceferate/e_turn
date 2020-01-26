import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePeriod'
})
export class TimePeriodPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 1:
        return '09:00-09:30'
      case 2:
        return '09:30-10:00'
      case 3:
        return '10:00-10:30'
      case 4:
        return '10:30-11:00'
      case 5:
        return '11:10-11:40'
      case 6:
        return '11:40-12:10'
      case 7:
        return '12:10-12:40'

      case 8:
        return '13:45-14:15'
      case 9:
        return '14:15-14:45'
      case 10:
        return '14:45-15:15'
      case 11:
        return '15:15-15:50'
      case 12:
        return '16:00-16:30'
      case 13:
        return '16:30-17:00'
      case 14:
        return '17:00-17:30'
      default:
        return 'Нетиповий період'
    }
  }

}


