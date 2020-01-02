import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialServise } from 'src/app/shared/classes/material.servise';
import { VprsServise } from 'src/app/shared/servises/vprs.servise';
import { Vpr } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-vprs-form',
  templateUrl: './vprs-form.component.html',
  styleUrls: ['./vprs-form.component.css']
})
export class VprsFormComponent implements OnInit {

  form: FormGroup
  isNew = true
  vpr: Vpr
  regionId: string


  constructor(private route: ActivatedRoute,
              private router: Router,
              private vprService: VprsServise) { }

  ngOnInit() {
    
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
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
              address: vpr.address
            })
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
      this.vprService.create(this.regionId, this.form.value.name, this.form.value.address)
        .subscribe((vpr) => {
          MaterialServise.toast(`Пункт ${vpr.name}: додано успішно`)
          this.form.reset()
          this.form.enable()
          this.router.navigate([`/vprs-regions/${this.regionId}/vprs`])
        })
    } else {
      this.vprService.update(this.vpr._id, this.regionId, this.form.value.name, this.form.value.address)
      .subscribe((vpr) => {
        MaterialServise.toast(`Пункт ${vpr.name}: змінено успішно`)
        this.form.enable()
      })
    }
  }

}
