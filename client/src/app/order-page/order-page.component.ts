import { Router } from '@angular/router';
import { OrderServise } from 'src/app/shared/servises/order.servise';
import { Component, OnInit, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegionsServise } from '../shared/servises/regions.servise';
import { Region, Vpr } from '../shared/interfaces';
import { MaterialInstance, MaterialServise } from '../shared/classes/material.servise';
import { VprsServise } from '../shared/servises/vprs.servise';
import { HolidaysServise } from '../shared/servises/holidays.servise';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnChanges {

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log(changes)
  }

  @Input('onSelect') onSelect: string;

  @ViewChild('regionRef', {static: false} ) regionRef: ElementRef
  @ViewChild('vprRef', {static: false} ) vprRef: ElementRef
  @ViewChild('vprCity', {static: false} ) vprCityRef: ElementRef
  @ViewChild('datepicker', {static: false} ) datepickerRef: ElementRef
  @ViewChild('modal', {static: false} ) modalRef: ElementRef

  regionLoading = false
  vprLoading = false
  form: FormGroup
  regionRefVisible = true
  vprRefVisible = true
  clientInfoRefVisible = true
  dateRefVisible = false
  orderTimeRefVisible = false
  modalInstanse = false

  regions: Region[] = []
  vprs: Vpr[] = []
  datepicker: MaterialInstance
  modal: MaterialInstance
  regionId: string = ''
  vprId: string = ''
  vprCity: string
  timePeriodNumber: number


  constructor(private regionServise: RegionsServise,
              private vprServise: VprsServise,
              private holidaysServise: HolidaysServise,
              private orderServise: OrderServise,
              private router: Router
              ) { }

  ngOnInit() {
    this.form = new FormGroup({
      region: new FormControl(null, [Validators.required]),
      vpr: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      customer_id_code: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    })

    this.form.controls.region.valueChanges.subscribe((value) => {
      this.regionId = value
    })

    this.form.controls.vpr.valueChanges.subscribe((value) => {
      this.vprId = value

      this.clientInfoRefVisible = false
    })
  }

  onSelectRegion() {
    this.regionRefVisible = false
    this.regionLoading = true
    this.regionServise.getAllActive().subscribe((regions) => {
      this.regions = regions
      this.regionLoading = false
    })
  }

  onSelectVpr() {
    if (this.regionId !== '') {
      // this.form.controls.region.disable()
      this.vprRefVisible = false

      this.vprLoading = true

      this.vprServise.fetch(this.regionId).subscribe((vprs) => {
        this.vprs = vprs
        this.vprLoading = false
      })
    } else {
      MaterialServise.toast('Оберіть область')
    }
  }

  onSelectDate() {
    if (this.vprId !== '') {

      const busyDaysArr = []

      // this.form.controls.vpr.disable()

      this.holidaysServise.fetch().subscribe(
        (holidays) => {
          holidays.forEach(function(el) {
            busyDaysArr.push(el.holiday)
          })
        },
        (error) => {
          console.error(error)
        }
      )

      this.orderServise.getBusyDaysByVprId(this.vprId).subscribe(
        (order) => {
          for (let date in order) {
            if (order[date] === 'busy') {
              let _date = Date.parse(date)
              let newDate = new Date(_date)
              busyDaysArr.push(newDate.toISOString())
            }
          }
        },
        (error) => {
          console.error(error)
        },
        () => {
          setTimeout(() => {
            this.datepicker.open()
          }, 300)
        }
      )


      function disableDays (date) {

        let offset = date.getTimezoneOffset()

        date = date.setMinutes(date.getMinutes() - offset)

        date = new Date(date)

        let _date = date.toISOString()

            if (busyDaysArr.includes(_date)) {
              return true
            }else{
              return false
            }
      }

      const minDate = new Date();
      
      //####################   доробити це гавно
      
      // let maxDate = new Date()
      // let _maxDate = (maxDate.setMonth(maxDate.getMonth() + 1)).toString()

      this.datepicker = MaterialServise.initDatePicker(this.datepickerRef, {
        // autoClose: true,
        defaultDate: new Date(),
        disableWeekends: true,
        firstDay: 1,
        format: 'dd mmmm yyyy',
        minDate: minDate,
        onSelect: (date) => {
          let offset = date.getTimezoneOffset()
          date = date.setMinutes(date.getMinutes() - offset)
  
          this.form.controls['date'].setValue(date)
          MaterialServise.updateTextInputs()
        },
        disableDayFn: disableDays,
        i18n: {
          cancel:	'Відмінити',
          clear:	'Очистити',
          done:	'Ok',
          previousMonth:	'‹',
          nextMonth:	'›',
          months: [
            'Січень',
            'Лютий',
            'Березень',
            'Квітень',
            'Травень',
            'Червень',
            'Липень',
            'Серпень',
            'Вересень',
            'Жовтень',
            'Листопад',
            'Грудень'
          ],
          monthsShort: [
            'Січ',
            'Лют',
            'Бер',
            'Кві',
            'Тра',
            'Чер',
            'Лип',
            'Сер',
            'Вер',
            'Жов',
            'Лис',
            'Гру'
          ],
          weekdays: [
            'Неділя',
            'Понеділок',
            'Вівторок',
            'Середа',
            'Четвер',
            'П\'ятниця',
            'Субота'
          ],
          weekdaysShort: [
            'Нед',
            'Пон',
            'Вів',
            'Сер',
            'Чет',
            'Пт',
            'Суб'
          ],
          weekdaysAbbrev:	['Нд','Пн','Вт','Ср','Чт','Пт','Сб']
        }


      })

      this.dateRefVisible = true

    } else {
      MaterialServise.toast('Оберіть пункт реєстрації')
    }
  }

  onSelectTime() {

    if (this.form.controls.date.valid) {
      this.modal = MaterialServise.initModal(this.modalRef)
      this.vprCity = this.vprCityRef.nativeElement.text
      this.modalInstanse = true
      this.modal.open()
    } else {
      MaterialServise.toast('Оберіть дату візиту')
    }
    // this.orderTimeRefVisible = true



  }

  onRunCustom() {
    console.log(this.form.value)
    console.log(this.timePeriodNumber)

    this.timePeriodNumber
  }

  onSelectTimePer(timeObj) {
    this.timePeriodNumber = timeObj.periodNumber
    this.form.controls.time.patchValue(timeObj.periodName)
    MaterialServise.updateTextInputs()
    this.modal.destroy()
    this.orderTimeRefVisible = true
  }


  onSubmit() {
    console.log('є')

    this.form.disable()

      this.orderServise.create(
        this.form.value.region,
        this.form.value.vpr,
        this.form.value.date,
        this.form.value.name,
        this.form.value.customer_id_code,
        this.timePeriodNumber,
        )
        
      .subscribe((order) => {
          // MaterialServise.toast(`Область ${region.name}: додано успішно`)
          console.log('Order', order)
          this.form.reset()
          this.form.enable()
          this.router.navigate([`/order/${order._id}`])
        })
    
    console.log(this.form.value)
  }
}
