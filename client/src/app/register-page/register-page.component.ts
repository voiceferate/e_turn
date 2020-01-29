import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthServise } from '../shared/servises/auth.servise';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialServise } from '../shared/classes/material.servise';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthServise,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      vpr: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      secure_id: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$')])
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })

      },
      (error) => {
        MaterialServise.toast(error.error.message)
      }
    )
  }

}
