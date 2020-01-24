import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderServise {
  constructor(private http: HttpClient) {
  }

  fetch(vprId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`api/order/${vprId}`)
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`/api/order/single/${id}`)
  }

  getByClientCode(customer_id_code: number): Observable<Order[]> {
    const formData = {
      'customer_id_code': customer_id_code
    }
    return this.http.post<Order[]>(`/api/order/client`, formData)
  }

  getBusyDaysByVprId(id: string): Observable<any> {
    return this.http.get<any>(`/api/order/vpr-free-date/${id}`)
  }

  getBusyPeriodsByVprId(vpr: string, date: Date): Observable<any> {
    
    const formData = {'vpr': vpr, 'date': date}

    return this.http.post<any>(`/api/order//vpr/time`, formData)
  }


  create(region: string, vpr, date, name, customer_id_code, time_period_number: number): Observable<Order> {
  
    const formData = {
      'region': region,
      'vpr': vpr,
      'date': date,
      'name' : name,
      'customer_id_code': customer_id_code,
      'time_period_number': time_period_number
    }
    
    return this.http.post<Order>('/api/order/', formData)
  }

  // update(id: string, region: string, name: string, address: string): Observable<Vpr> {
    
  //   const formData = {'id': id, 'region': region, 'name': name, 'address': address}
    
  //   return this.http.patch<Vpr>(`/api/vpr/${id}`, formData)
  // }

  // delete(id: string): Observable<any> {
  //   return this.http.delete<any>(`/api/vpr/${id}`)
  // }

}