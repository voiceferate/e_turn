import { Order } from './../../shared/interfaces';
import { OrderServise } from 'src/app/shared/servises/order.servise';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { RecaptchaServise } from 'src/app/shared/servises/recaptcha.servise';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {


  @ViewChild('results') resultsRef: ElementRef

  form: FormGroup
  orders$: Observable<Order[]>
  loading = false
  data: boolean
  captchaSolved = false

  constructor(private orderServise: OrderServise,
              private recaptchaServise: RecaptchaServise
              ) { }

  ngOnInit() {
    this.form = new FormGroup({
      customer_id_code: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
    this.orders$ = this.orderServise.getByClientCode(this.form.value.customer_id_code)
    this.resultsRef.nativeElement.classList.remove('hide')
    this.form.disable()
  }

  resolved(captchaResponse: string) {
    this.recaptchaServise.check(captchaResponse).subscribe((resp) => {
      this.captchaSolved = true
    })
  }
  
  

}
