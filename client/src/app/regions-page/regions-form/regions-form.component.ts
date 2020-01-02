import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ComponentRef, ChangeDetectionStrategy } from '@angular/core';
import { Region } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RegionsServise } from 'src/app/shared/servises/regions.servise';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialServise } from 'src/app/shared/classes/material.servise';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-regions-form',
  templateUrl: './regions-form.component.html',
  styleUrls: ['./regions-form.component.css']
})

export class RegionsFormComponent implements OnInit, AfterViewInit {

  @ViewChild("id", {static: true}) idRef: ElementRef

  form: FormGroup
  isNew = true
  region: Region


  constructor(private route: ActivatedRoute,
              private router: Router,
              private regionsServise: RegionsServise) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      active: new FormControl(true),
      _id: new FormControl()
    })

    this.form.disable()

    this.route.params
      .pipe( 
        switchMap( (params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.regionsServise.getById(params['id'])
          }
            return of(null)
          } 
        )
      )
      .subscribe(
        region => {
          if (region) {
            console.log(region)
            this.form.patchValue({
              name: region.name,
              active: region.active
            })
            this.region = region
            MaterialServise.updateTextInputs()
          }
          this.form.enable()
        },
        error => {
          MaterialServise.toast(error.error.message)
        }
      )


  }
  
  ngAfterViewInit() {

  }

  onDelete(event: Event) {
    event.preventDefault()
    this.regionsServise.delete(this.region._id)
      .subscribe((res) => {
        console.log(res)
        MaterialServise.toast(res.message)
        
        
        this.form.enable()
        this.router.navigate(['/regions'])

      })
  }


  onSubmit() {
    console.log(this.isNew)
    this.form.disable()

    if (this.isNew) {
      this.regionsServise.create(this.form.value.name, this.form.value.active)
        .subscribe((region) => {
          MaterialServise.toast(`Область ${region.name}: додано успішно`)
          this.form.reset()
          this.form.enable()
          this.router.navigate(['/regions'])
        })
    } else {
      console.log('updated')
      this.regionsServise.update(this.region._id, this.form.value.name, this.form.value.active)
      .subscribe((region) => {
        MaterialServise.toast(`Область ${region.name}: змінено успішно`)
        this.form.enable()
      })
    }
    
    console.log(this.form.value.name, this.form.value.active)
  }
}
