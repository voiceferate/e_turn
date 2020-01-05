import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { Holiday } from 'src/app/shared/interfaces';
import { HolidaysServise } from 'src/app/shared/servises/holidays.servise';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialServise, MaterialInstance } from 'src/app/shared/classes/material.servise';

@Component({
  selector: 'app-holidays-form',
  templateUrl: './holidays-form.component.html',
  styleUrls: ['./holidays-form.component.css']
})
export class HolidaysFormComponent implements OnInit, AfterViewInit {
  
  


  @ViewChild("datepicker", {static: false}) datepickerRef: ElementRef

  form: FormGroup
  isNew = true
  holiday: Holiday
  datepicker: MaterialInstance
  input: Event


  constructor(private route: ActivatedRoute,
    private router: Router,
    private holidaysServise: HolidaysServise
) { }


  // ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
  //   console.log('change', changes)

  //   // this.datepickerRef.nativeElement.trigger('input')
  //   // MaterialServise.updateTextInputs()
  // }

  ngAfterViewInit() {
    this.datepicker = MaterialServise.initDatePicker(this.datepickerRef, {
      // autoClose: true,
      disableWeekends: true,
      firstDay: 1,
      format: 'dd mmmm yyyy',
      onSelect: (date) => {
        this.form.controls.holiday.setValue(date)
      },
      disableDayFn: function (date) {

        let disableListDate = [new Date('2020,1,8').toDateString(),new Date('2020,1,10').toDateString()];
            if(disableListDate.includes(date.toDateString())) {
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
  }

  ngOnInit() {

    this.form = new FormGroup({
      holiday_name: new FormControl(null, [Validators.required]),
      holiday: new FormControl(null, [Validators.required]),
      _id: new FormControl()
    })

    this.route.params
      .pipe( 
        switchMap( (params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.holidaysServise.getById(params['id'])
          }
            return of(null)
          } 
        )
      )
      .subscribe(
        holiday => {
          if (holiday) {
            console.log(holiday)
            this.form.patchValue({
              holiday_name: holiday.holiday_name,
              holiday: holiday.holiday
            })
            this.holiday = holiday
            MaterialServise.updateTextInputs()
          }
          this.form.enable()
        },
        error => {
          MaterialServise.toast(error.error.message)
        }
      )
  }
  
  onDelete(event: Event) {
    event.preventDefault()
    this.holidaysServise.delete(this.holiday._id)
      .subscribe((res) => {
        console.log(res)
        MaterialServise.toast(res.message)
        
        this.form.enable()
        this.router.navigate(['/holidays'])

      })
  }


  onSubmit() {
    console.log(this.isNew)
    this.form.disable()

    if (this.isNew) {
      this.holidaysServise.create(this.form.value.holiday, this.form.value.holiday_name)
        .subscribe((holiday) => {
          MaterialServise.toast(`Дату ${holiday.holiday}: додано успішно`)
          this.form.reset()
          this.form.enable()
          this.router.navigate(['/holidays'])
        })
    } else {
      console.log('updated')
      console.log(this.holiday._id, this.form.value.holiday, this.form.value.holiday_name)
      this.holidaysServise.update(this.holiday._id, this.form.value.holiday, this.form.value.holiday_name)
      .subscribe((holiday) => {
        MaterialServise.toast(`Дату ${holiday.holiday}: змінено успішно`)
        this.form.enable()
      })
    }
  }

  // onFocus() {
  //   console.log()
  //   // this.datepicker.open()
  // }
}
