import { Order } from './../../shared/interfaces';
import { OrderServise } from 'src/app/shared/servises/order.servise';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {


  @ViewChild('results', {'static': false}) resultsRef: ElementRef

  form: FormGroup
  orders$: Observable<Order[]>
  loading = false
  data: boolean

  constructor(private orderServise: OrderServise) { }

  ngOnInit() {
    this.form = new FormGroup({
      customer_id_code: new FormControl(null, [Validators.required]),
    })
  }

  // ngAfterViewInit(): void {
  //   console.log(this.resultsRef.classList.value)
  // }

  onSubmit() {
    this.orders$ = this.orderServise.getByClientCode(this.form.value.customer_id_code)
    
    console.log('this.resultsRef.classList.value', this.resultsRef.nativeElement.classList.value)
    this.resultsRef.nativeElement.classList.remove('hide')
    // this.resultsRef.classList.remove('hide')
  }

}
