import { OrderServise } from 'src/app/shared/servises/order.servise';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-select-page',
  templateUrl: './time-select-page.component.html',
  styleUrls: ['./time-select-page.component.css']
})
export class TimeSelectPageComponent implements OnInit {

  @Input('vpr') vpr
  @Input('vprId') vprId
  @Input('date') date

  @Output() onSelectTimePeriod = new EventEmitter<any>();


  constructor(private orderService: OrderServise) { }

  timeTableTempate = []

  ngOnInit() {

    const timeTableObj = [
      {periodName: '1', timeTemplate: '09:00-09:30', status: 'free'},
      {periodName: '2', timeTemplate: '09:30-10:00', status: 'free'},
      {periodName: '3', timeTemplate: '10:00-10:30', status: 'free'},
      {periodName: '4', timeTemplate: '10:30-11:00', status: 'free'},
      {periodName: '5', timeTemplate: '11:10-11:40', status: 'free'},
      {periodName: '6', timeTemplate: '11:40-12:10', status: 'free'},
      {periodName: '7', timeTemplate: '12:10-12:40', status: 'free'},

      {periodName: '8', timeTemplate: '13:45-14:15', status: 'free'},
      {periodName: '9', timeTemplate: '14:15-14:45', status: 'free'},
      {periodName: '10', timeTemplate: '14:45-15:15', status: 'free'},
      {periodName: '11', timeTemplate: '15:15-15:50', status: 'free'},
      {periodName: '12', timeTemplate: '16:00-16:30', status: 'free'},
      {periodName: '13', timeTemplate: '16:30-17:00', status: 'free'},
      {periodName: '14', timeTemplate: '17:00-17:30', status: 'free'},
    ]

    this.orderService.getBusyPeriodsByVprId(this.vprId, this.date).subscribe(
      (dates) => {

        let busyPeriods = []

        dates.forEach(function(item, i, arr) {
          busyPeriods.push(item.time_period_number)
        })


        timeTableObj.forEach(function(item, i, arr) {
          if (busyPeriods.includes(+item.periodName)) {
            item.status = 'busy'
          }
        })
      },
      error => {
        console.error(error)
      },
      () => {
        this.timeTableTempate = timeTableObj
      }
    )
  }

  onClick(periodNumber, periodName){
    const outputTime = {
      periodNumber: periodNumber,
      periodName: periodName
    }
    this.onSelectTimePeriod.emit(outputTime)
  }
}
