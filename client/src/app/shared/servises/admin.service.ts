import { User } from './../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
    
  }

  fetch(): Observable<User[]> {
    return this.http.get<User[]>('/api/admin/')
  }

  // getAllActive(): Observable<Region[]> {
  //   return this.http.get<Region[]>('/api/region/active')
  // }

  // getById(id: string): Observable<Region> {
  //   return this.http.get<Region>(`/api/region/${id}`)
  // }

  // create(name: string, active: string): Observable<Region> {
  
  //   const formData = {'name': name, 'active': active}
    
  //   return this.http.post<Region>('/api/region/', formData)
  // }

  // update(id: string, name: string, active: string): Observable<Region> {
    
  //   const formData = {'id': id, 'name': name, 'active': active}
    
  //   return this.http.patch<Region>(`/api/region/${id}`, formData)
  // }

  // delete(id: string): Observable<any> {
  //   return this.http.delete<any>(`/api/region/${id}`)
  // }
}
