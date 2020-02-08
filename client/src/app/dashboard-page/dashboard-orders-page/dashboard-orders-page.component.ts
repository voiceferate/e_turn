import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/interfaces';
import { OrderServise } from 'src/app/shared/servises/order.servise';
import { ActivatedRoute } from '@angular/router';
import { MaterialServise } from 'src/app/shared/classes/material.servise';

@Component({
  selector: 'app-dashboard-orders-page',
  templateUrl: './dashboard-orders-page.component.html',
  styleUrls: ['./dashboard-orders-page.component.css']
})
export class DashboardOrdersPageComponent implements OnInit {

  orders$: Observable<Order[]>


  constructor(private orderServise: OrderServise,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        orders => {
        this.orders$ = this.orderServise.fetch(orders.vprId)
      })
      error => {
        MaterialServise.toast(error.error.message)
      }
  }

}
