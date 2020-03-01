import {Component, OnInit, OnDestroy} from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthServise } from '../shared/servises/auth.servise'
import { Subscription } from 'rxjs'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { MaterialServise } from '../shared/classes/material.servise'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthServise,
              private router: Router,
              private route: ActivatedRoute,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Вхід до системи')


    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialServise.toast('Після схвалення адміністратора можна увійти до системи використвуючи свої дані')
      } else if (params['accessDenied']) {
        MaterialServise.toast('Для початку авторизуйтесь в системі')
      } else if (params['sessionExpired']) {
        MaterialServise.toast('Сесія закінчилася, потрібно перезайти в систему')
      }
    })
  }
  

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        MaterialServise.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
