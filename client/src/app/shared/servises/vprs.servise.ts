import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vpr } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VprsServise {
  constructor(private http: HttpClient) {
    
  }

  fetch(regionId: string): Observable<Vpr[]> {
    return this.http.get<Vpr[]>(`api/vpr/region/${regionId}`)
  }

  getById(id: string): Observable<Vpr> {
    return this.http.get<Vpr>(`/api/vpr/${id}`)
  }

  create(region: string, name: string, address: string, startDate1: Date, endDate1: Date, startDate2: Date, endDate2: Date, startDate3: Date, endDate3: Date): Observable<Vpr> {
  
    const formData = {'region': region, 'name': name, 'address': address, vacation: [{'startDate1': startDate1, 'endDate1': endDate1}, {'startDate2': startDate2, 'endDate2': endDate2},{'startDate3': startDate3, 'endDate3': endDate3}]}
    
    return this.http.post<Vpr>('/api/vpr/', formData)
  }

  update(id: string, region: string, name: string, address: string, startDate1: Date, endDate1: Date, startDate2: Date, endDate2: Date, startDate3: Date, endDate3: Date): Observable<Vpr> {
    
    const formData = {'id': id, 'region': region, 'name': name, 'address': address, vacation: [{'startDate1': startDate1, 'endDate1': endDate1}, {'startDate2': startDate2, 'endDate2': endDate2},{'startDate3': startDate3, 'endDate3': endDate3}]}
    
    return this.http.patch<Vpr>(`/api/vpr/${id}`, formData)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/vpr/${id}`)
  }

}