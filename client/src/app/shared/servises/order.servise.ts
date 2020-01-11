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

  getBusyDaysByVprId(id: string): Observable<any> {
    return this.http.get<any>(`/api/order/vpr-free-date/${id}`)
  }

  // create(region: string, name: string, address: string): Observable<Vpr> {
  
  //   const formData = {'region': region, 'name': name, 'address': address}
    
  //   return this.http.post<Vpr>('/api/vpr/', formData)
  // }

  // update(id: string, region: string, name: string, address: string): Observable<Vpr> {
    
  //   const formData = {'id': id, 'region': region, 'name': name, 'address': address}
    
  //   return this.http.patch<Vpr>(`/api/vpr/${id}`, formData)
  // }

  // delete(id: string): Observable<any> {
  //   return this.http.delete<any>(`/api/vpr/${id}`)
  // }

}