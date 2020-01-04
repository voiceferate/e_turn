import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, Holiday } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HolidaysServise {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`api/holiday`)
  }

  getById(id: string): Observable<Holiday> {
    return this.http.get<Holiday>(`/api/holiday/${id}`)
  }

  create(holiday: Date, holiday_name: string): Observable<Holiday> {
    const formData = {'holiday': holiday, 'holiday_name': holiday_name}
    return this.http.post<Holiday>('/api/holiday/', formData)
  }

  update(id: string, holiday: Date, holiday_name: string): Observable<Holiday> {
    const formData = {'id': id, 'holiday': holiday, 'holiday_name': holiday_name}
    return this.http.patch<Holiday>(`/api/holiday/${id}`, formData)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/holiday/${id}`)
  }

}