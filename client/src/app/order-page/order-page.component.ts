import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
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

  @ViewChild('regionRef', {static: false} ) regionRef: ElementRef
  @ViewChild('vprRef', {static: false} ) vprRef: ElementRef
  @ViewChild('datepicker', {static: false} ) datepickerRef: ElementRef

  regionLoading = false
  vprLoading = false
  form: FormGroup
  regionRefVisible = true
  vprRefVisible = true
  clientInfoRefVisible = true
  dateRefVisible = false

  regions: Region[] = []
  vprs: Vpr[] = []
  datepicker: MaterialInstance
  regionId: string = ''
  vprId: string = ''



  constructor(private regionServise: RegionsServise,
              private vprServise: VprsServise,
              private holidaysServise: HolidaysServise
              ) { }

  ngOnInit() {
    this.form = new FormGroup({
      region: new FormControl(null, [Validators.required]),
      vpr: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      idCode: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
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
      this.form.controls.region.disable()
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


      this.form.controls.vpr.disable()

      this.holidaysServise.fetch().subscribe(
        (holidays) => {
        holidays.forEach(function(el) {
          busyDaysArr.push(el.holiday)


        }),
        (error) => {
          console.error(error)
        }
      })

      console.log(busyDaysArr)

      function disableDays (date) {

        let offset = date.getTimezoneOffset()

        date = date.setMinutes(date.getMinutes() - offset)

        date = new Date(date)

        let _date = date.toISOString()

            if (busyDaysArr.includes(_date)) {
              console.log('true')
              return true
            }else{
              return false
            }
      }

      this.datepicker = MaterialServise.initDatePicker(this.datepickerRef, {
        // autoClose: true,
        defaultDate: new Date(),
        disableWeekends: true,
        firstDay: 1,
        format: 'dd mmmm yyyy',
        onSelect: (date) => {
          this.form.controls['date'].setValue(formatDate(date, 'dd MMMM yyyy', 'en-US', '+0000'))
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

      setTimeout(() => {
        this.datepicker.open()
      }, 50)

      this.dateRefVisible = true

    } else {
      MaterialServise.toast('Оберіть пункт реєстрації')
    }
  }

  onRunCustom() {
    let a = new Date
    console.log(this.form.controls.date)


    console.log('formated', formatDate(a, 'dd MM yyyy', 'en-US', '+0200'))
  }
}
