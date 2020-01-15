import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from './../../shared/interfaces';
import { OrderServise } from 'src/app/shared/servises/order.servise';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-order-page',
  templateUrl: './single-order-page.component.html',
  styleUrls: ['./single-order-page.component.css']
})
export class SingleOrderPageComponent implements OnInit {

  order$: Observable<Order>

  constructor(private orderServise: OrderServise,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( (params) => {
      console.log('id', params)

      this.order$ = this.orderServise.getById(params.id)

    } )


  }

}
