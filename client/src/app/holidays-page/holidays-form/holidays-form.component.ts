import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { Holiday } from 'src/app/shared/interfaces';
import { HolidaysServise } from 'src/app/shared/servises/holidays.servise';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialServise, MaterialInstance } from 'src/app/shared/classes/material.servise';
import { Config } from 'src/app/shared/i18n_for_mtc';

@Component({
  selector: 'app-holidays-form',
  templateUrl: './holidays-form.component.html',
  styleUrls: ['./holidays-form.component.css']
})
export class HolidaysFormComponent implements OnInit, AfterViewInit {
  
  


  @ViewChild("datepicker") datepickerRef: ElementRef

  form: FormGroup
  isNew = true
  holiday: Holiday
  datepicker: MaterialInstance
  input: Event


  constructor(private route: ActivatedRoute,
    private router: Router,
    private holidaysServise: HolidaysServise,
    public config: Config
) { }


  ngAfterViewInit() {
    this.datepicker = MaterialServise.initDatePicker(this.datepickerRef, {
      // autoClose: true,
      disableWeekends: true,
      firstDay: 1,
      format: 'dd mmmm yyyy',
      onSelect: (date) => {
        let offset = date.getTimezoneOffset()
        date = date.setMinutes(date.getMinutes() - offset)

        this.form.controls.holiday.setValue(date)
      },
      i18n: this.config.i18n

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

    const result = confirm('Ви впевнені що хочете видалити дату вихідного дня?')

    if (!result) {
      return
    }

    this.holidaysServise.delete(this.holiday._id)
      .subscribe((res) => {
        MaterialServise.toast(res.message)
        
        this.form.enable()
        this.router.navigate(['/holidays'])

      })
  }


  onSubmit() {
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
      this.holidaysServise.update(this.holiday._id, this.form.value.holiday, this.form.value.holiday_name)
      .subscribe((holiday) => {
        MaterialServise.toast(`Дату ${holiday.holiday}: змінено успішно`)
        this.form.enable()
      })
    }
  }
}
