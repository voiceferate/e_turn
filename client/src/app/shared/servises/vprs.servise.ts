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

  create(region: string, name: string, address: string): Observable<Vpr> {
  
    const formData = {'region': region, 'name': name, 'address': address}
    
    return this.http.post<Vpr>('/api/vpr/', formData)
  }

  update(id: string, region: string, name: string, address: string): Observable<Vpr> {
    
    const formData = {'id': id, 'region': region, 'name': name, 'address': address}
    
    return this.http.patch<Vpr>(`/api/vpr/${id}`, formData)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/vpr/${id}`)
  }

}