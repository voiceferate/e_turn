import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderServise } from 'src/app/shared/servises/order.servise';
import { Component, OnInit, ViewChild, ElementRef, OnChanges, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegionsServise } from '../shared/servises/regions.servise';
import { Region, Vpr } from '../shared/interfaces';
import { MaterialInstance, MaterialServise } from '../shared/classes/material.servise';
import { VprsServise } from '../shared/servises/vprs.servise';
import { HolidaysServise } from '../shared/servises/holidays.servise';
import { RecaptchaServise } from '../shared/servises/recaptcha.servise';
import * as moment from 'moment';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {



  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log(changes)
  }

  @Input('onSelect') onSelect: string;
  // @Input('onSelectRegionFromMap') onSelectRegionFromMap: any;

  @ViewChild('regionRef', {static: false} ) regionRef: ElementRef
  @ViewChild('vprRef', {static: false} ) vprRef: ElementRef
  @ViewChild('vprCity', {static: false} ) vprCityRef: ElementRef
  @ViewChild('datepicker', {static: false} ) datepickerRef: ElementRef
  @ViewChild('modal', {static: false} ) modalRef: ElementRef
  @ViewChild('modalPersonalData', {static: false} ) modalPersonalDataRef: ElementRef

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
  modalPersonalData: MaterialInstance
  regionId: string = ''
  vprId: string = ''
  vprCity: string
  timePeriodNumber: number
  private captchaSolved = false

  vSub: Subscription
  valueChangesVprSub: Subscription
  valueChangesRegionSub: Subscription


  constructor(private regionServise: RegionsServise,
              private vprServise: VprsServise,
              private holidaysServise: HolidaysServise,
              private orderServise: OrderServise,
              private recaptchaServise: RecaptchaServise,
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

    this.valueChangesRegionSub = this.form.controls.region.valueChanges.subscribe((value) => {
      this.regionId = value
      this.vprRefVisible = true
      this.regionRef.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    })

    this.valueChangesVprSub = this.form.controls.vpr.valueChanges.subscribe((value) => {
      this.vprId = value
      this.onSelectVpr()
      this.clientInfoRefVisible = false
    })
  }

  ngOnDestroy(): void {
    this.vSub.unsubscribe()
    this.valueChangesRegionSub.unsubscribe()


    // todo відписатися від усього
  }

  ngAfterViewInit(): void {
    // throw new Error("Method not implemented.");
  }

  onSelectRegion() {
    this.regionRefVisible = false
    this.regionLoading = true
    this.regionServise.getAllActive().subscribe((regions) => {
      this.regions = regions
      this.regionLoading = false
    })
  }

//######################  по ресайзу
// https://stackblitz.com/edit/resize-screen

  onSelectRegionFromMap(event) {
    this.form.controls.region.setValue(event.region)
    this.regionId = event.region
    this.regionRefVisible = false
    this.regions = event.regions
  }

  onSelectVpr() {
    if (this.regionId !== '') {
      // this.form.controls.region.disable()
      this.vprRefVisible = false

      this.vprLoading = true

      this.vSub = this.vprServise.fetch(this.regionId).subscribe((vprs) => {
        this.vprs = vprs
        this.vprLoading = false
      })
    } else {
      MaterialServise.toast('Оберіть область')
    }
  }

  onSelectDate() {
    if (this.vprId !== '') {
      if(this.captchaSolved) {

        this.valueChangesVprSub.unsubscribe()

        const busyDaysArr = []
  
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
          }
        )

        this.vprServise.getById(this.vprId).subscribe( (vpr: Vpr) => {
          if (vpr.vacation.length) {
            if (vpr.vacation[0].endDate1 !== undefined) {
              const start1 = moment(vpr.vacation[0].startDate1)
              const end1 = moment(vpr.vacation[0].endDate1)

              for (let m = moment(start1); m.isBefore(end1); m.add(1, 'days')) {
                busyDaysArr.push(m.utc().toISOString())
              }
            }

            if (vpr.vacation[1].endDate2 !== undefined) {
              const start2 = moment(vpr.vacation[1].startDate2)
              const end2 = moment(vpr.vacation[1].endDate2)

              for (let m = moment(start2); m.isBefore(end2); m.add(1, 'days')) {
                busyDaysArr.push(m.utc().toISOString())
              }
            }

            if (vpr.vacation[1].endDate2 !== undefined) {
              const start3 = moment(vpr.vacation[2].startDate3)
              const end3 = moment(vpr.vacation[2].endDate3)

              for (let m = moment(start3); m.isBefore(end3); m.add(1, 'days')) {
                busyDaysArr.push(m.utc().toISOString())
              }
            }
          }
        })
        
          this.datepicker = MaterialServise.initDatePicker(this.datepickerRef, {
          // autoClose: true,
          defaultDate: new Date(),
          disableWeekends: true,
          firstDay: 1,
          minDate: moment().toDate(),
          maxDate: moment().add(31, 'days').toDate(),
          format: 'dd mmmm yyyy',
          onSelect: (date) => {
            let offset = date.getTimezoneOffset()
            date = date.setMinutes(date.getMinutes() - offset)
            this.form.controls['date'].setValue(date)
            MaterialServise.updateTextInputs()
          },
          disableDayFn: (date) => {
            let offset = date.getTimezoneOffset()
            date = date.setMinutes(date.getMinutes() - offset)
            date = new Date(date)
            let _date = date.toISOString()
                if (busyDaysArr.includes(_date)) {
                  return true
                }else{
                  return false
                }
            },
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
        MaterialServise.toast('Необхідно пройти капчу')
      }
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
  }

  onRunCustom(ev) {
    console.log(this.onSelectRegionFromMap)
    console.log(ev)
  }

  onSelectTimePer(timeObj) {
    this.timePeriodNumber = timeObj.periodNumber
    this.form.controls.time.patchValue(timeObj.periodName)
    MaterialServise.updateTextInputs()
    this.modal.close()
    this.orderTimeRefVisible = true
  }


  onSubmit() {
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
          MaterialServise.toast(`Ви успішно зареєструвалися в системі`)
          this.form.reset()
          this.form.enable()
          this.router.navigate([`/order/${order._id}`])
        })
  }

  resolved(captchaResponse: string) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);

    this.recaptchaServise.check(captchaResponse).subscribe((resp) => {
      console.log(resp)
      this.captchaSolved = true
    })
  }

  showModal() {
    console.log('init')
    this.modalPersonalData = MaterialServise.initModal(this.modalPersonalDataRef)
    this.modalPersonalData.open()
  }




  

}
