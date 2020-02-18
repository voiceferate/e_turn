import { Config } from './../../../shared/i18n_for_mtc';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialServise, MaterialInstance } from 'src/app/shared/classes/material.servise';
import { VprsServise } from 'src/app/shared/servises/vprs.servise';
import { Vpr } from 'src/app/shared/interfaces';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-vprs-form',
  templateUrl: './vprs-form.component.html',
  styleUrls: ['./vprs-form.component.css']
})
export class VprsFormComponent implements OnInit, AfterViewInit {


  @ViewChild('datePickerStart1', {static: false}) datePickerStart1Ref: ElementRef
  @ViewChild('datePickerEnd1', {static: false}) datePickerEnd1Ref: ElementRef
  @ViewChild('datePickerStart2', {static: false}) datePickerStart2Ref: ElementRef
  @ViewChild('datePickerEnd2', {static: false}) datePickerEnd2Ref: ElementRef
  @ViewChild('datePickerStart3', {static: false}) datePickerStart3Ref: ElementRef
  @ViewChild('datePickerEnd3', {static: false}) datePickerEnd3Ref: ElementRef

  form: FormGroup
  isNew = true
  vpr: Vpr
  regionId: string

  datePickerStart1: MaterialInstance
  datePickerEnd1: MaterialInstance
  datePickerStart2: MaterialInstance
  datePickerEnd2: MaterialInstance
  datePickerStart3: MaterialInstance
  datePickerEnd3: MaterialInstance

  constructor(private route: ActivatedRoute,
              private router: Router,
              private vprService: VprsServise,
              public config: Config) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      vacation1StartDate: new FormControl(null, [Validators.required]),
      vacation1EndDate: new FormControl(null, [Validators.required]),
      vacation2StartDate: new FormControl(null),
      vacation2EndDate: new FormControl(null),
      vacation3StartDate: new FormControl(null),
      vacation3EndDate: new FormControl(null),

      _id: new FormControl()
    })

    this.form.disable()

    this.route.params
      .pipe( 
        switchMap( (params: Params) => {
          //получаємо ID області
          this.regionId = params['regionId']
          if (params['vprId']) {
            this.isNew = false
            return this.vprService.getById(params['vprId'])
          }
            return of(null)
          }
        )
      )
      .subscribe(
        vpr => {
          if (vpr) {
            // вносимо отримані дані в форму
            
            this.form.patchValue({
              name: vpr.name,
              address: vpr.address,
            })
            if (vpr.vacation.length) {
              if (vpr.vacation[0].startDate1) {
                this.form.patchValue({
                  vacation1StartDate: formatDate(vpr.vacation[0].startDate1, 'dd MMMM yyyy', 'en-US'),
                  vacation1EndDate: formatDate(vpr.vacation[0].endDate1, 'dd MMMM yyyy', 'en-US'),
                })
              }
              if (vpr.vacation[1].startDate2) {
                this.form.patchValue({
                  vacation2StartDate: formatDate(vpr.vacation[1].startDate2, 'dd MMMM yyyy', 'en-US'),
                  vacation2EndDate: formatDate(vpr.vacation[1].endDate2, 'dd MMMM yyyy', 'en-US'),
                })
              }
              if (vpr.vacation[2].startDate3) {
                this.form.patchValue({
                  vacation3StartDate: formatDate(vpr.vacation[2].startDate3, 'dd MMMM yyyy', 'en-US'),
                  vacation3EndDate: formatDate(vpr.vacation[2].endDate3, 'dd MMMM yyyy', 'en-US'),
                })
              } 
            }


            // this.form.patchValue({
            //   name: vpr.name,
            //   address: vpr.address,
            //   vacation1StartDate: vpr.vacation[0].startDate1,
            //   vacation1EndDate: vpr.vacation[0].endDate1,
            //   vacation2StartDate: vpr.vacation[1].startDate2,
            //   vacation2EndDate: vpr.vacation[1].endDate2,
            //   vacation3StartDate: vpr.vacation[2].startDate3,
            //   vacation3EndDate: vpr.vacation[2].endDate3,
            // })
            this.vpr = vpr
            MaterialServise.updateTextInputs()
          }
          this.form.enable()
        },
        error => {
          MaterialServise.toast(error.error.message)
        }
      )
  }

  ngAfterViewInit(): void {
    this.datePickerStart1 = MaterialServise.initDatePicker(this.datePickerStart1Ref, {
      onSelect: (date) => {
        let offset = date.getTimezoneOffset()
        date = date.setMinutes(date.getMinutes() - offset)
        this.form.controls.vacation1StartDate.setValue(date)
        this.datePickerStart1Ref.nativeElement.focus()
      }
    })
    this.datePickerEnd1 = MaterialServise.initDatePicker(this.datePickerEnd1Ref, {
      onSelect: (date) => {
        let offset = date.getTimezoneOffset()
        date = date.setMinutes(date.getMinutes() - offset)
        this.form.controls.vacation1EndDate.setValue(date)
        this.datePickerEnd1Ref.nativeElement.focus()
      },
      i18n: this.config.i18n
    })
    this.datePickerStart2 = MaterialServise.initDatePicker(this.datePickerStart2Ref, {
      onSelect: (date) => {
        let offset = date.getTimezoneOffset()
        date = date.setMinutes(date.getMinutes() - offset)
        this.form.controls.vacation2StartDate.setValue(date)
        this.datePickerStart2Ref.nativeElement.focus()
      },
      i18n: this.config.i18n
    })
    this.datePickerEnd2 = MaterialServise.initDatePicker(this.datePickerEnd2Ref, {
      onSelect: (date) => {
        let offset = date.getTimezoneOffset()
        date = date.setMinutes(date.getMinutes() - offset)
        this.form.controls.vacation2EndDate.setValue(date)
        this.datePickerEnd2Ref.nativeElement.focus()
      }
    })
    this.datePickerStart3 = MaterialServise.initDatePicker(this.datePickerStart3Ref, {
      onSelect: (date) => {
        let offset = date.getTimezoneOffset()
        date = date.setMinutes(date.getMinutes() - offset)
        this.form.controls.vacation3StartDate.setValue(date)
        this.datePickerStart3Ref.nativeElement.focus()
      },
      i18n: this.config.i18n
    })
    this.datePickerEnd3 = MaterialServise.initDatePicker(this.datePickerEnd3Ref, {
      onSelect: (date) => {
        let offset = date.getTimezoneOffset()
        date = date.setMinutes(date.getMinutes() - offset)
        this.form.controls.vacation3EndDate.setValue(date)
        this.datePickerEnd3Ref.nativeElement.focus()
      },
      i18n: this.config.i18n
    })

  }
  
  onDelete(event: Event) {
    event.preventDefault()
    this.vprService.delete(this.vpr._id)
      .subscribe((res) => {
        MaterialServise.toast(res.message)
        this.form.enable()
        this.router.navigate([`/vprs-regions/${this.regionId}/vprs`])
      })
  }


  onSubmit() {
    this.form.disable()

    if (this.isNew) {
      this.vprService.create(this.regionId, this.form.value.name, this.form.value.address, this.form.value.vacation1StartDate, this.form.value.vacation1EndDate, this.form.value.vacation2StartDate, this.form.value.vacation2EndDate, this.form.value.vacation3StartDate, this.form.value.vacation3EndDate)
        .subscribe((vpr) => {
          MaterialServise.toast(`Пункт ${vpr.name}: додано успішно`)
          this.form.reset()
          this.form.enable()
          this.router.navigate([`/vprs-regions/${this.regionId}/vprs`])
        })
    } else {
      this.vprService.update(this.vpr._id, this.regionId, this.form.value.name, this.form.value.address, this.form.value.vacation1StartDate, this.form.value.vacation1EndDate, this.form.value.vacation2StartDate, this.form.value.vacation2EndDate, this.form.value.vacation3StartDate, this.form.value.vacation3EndDate)
      .subscribe((vpr) => {
        MaterialServise.toast(`Пункт ${vpr.name}: змінено успішно`)
        this.form.enable()
      })
    }
  }
}
