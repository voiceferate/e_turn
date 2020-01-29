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

  getById(id: string): Observable<User> {
    return this.http.get<User>(`/api/admin/${id}`)
  }

  update(id: string, status: string): Observable<User> {
    
    const formData = {'id': id, 'status': status}
    return this.http.patch<User>(`/api/admin/${id}`, formData)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/admin/${id}`)
  }
}
