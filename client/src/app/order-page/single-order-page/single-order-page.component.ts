import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order, Vpr } from './../../shared/interfaces';
import { OrderServise } from 'src/app/shared/servises/order.servise';
import { Component, OnInit } from '@angular/core';
import { VprsServise } from 'src/app/shared/servises/vprs.servise';

@Component({
  selector: 'app-single-order-page',
  templateUrl: './single-order-page.component.html',
  styleUrls: ['./single-order-page.component.css']
})
export class SingleOrderPageComponent implements OnInit {

  order$: Observable<Order>
  vpr$: Observable<Vpr>

//переписати, бо це гавно

  constructor(private orderServise: OrderServise,
              private vprServise: VprsServise,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( (params) => {
      this.order$ = this.orderServise.getById(params.id)
    } )

    this.order$.subscribe((order:Order) => {
      this.vpr$ = this.vprServise.getById(order.vpr)
    })
  }

}
