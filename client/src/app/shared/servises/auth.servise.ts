import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthServise {

  private token = null
  private role = null

  constructor(private http: HttpClient) {}
  
  login(user: User): Observable<{token: string, role: string}> {
    return this.http.post<{token: string, role: string}>('/api/auth/login', user)
    .pipe(
      tap(
        ({token, role}) =>{
          localStorage.setItem('auth-token', token)
          this.setToken(token)
          localStorage.setItem('role', role)
          this.setRole(role)
        }
      )
    )
  }

  setToken(token: string) {
    this.token = token
  }

  setRole(role: string) {
    this.role = role
  }

  getToken(): string {
    return this.token
  }

  getRole(): string {
    return this.role
  }

  isAutheticated(): boolean {
    return !!this.token
  }

  isSuAdmin(localStorageItem):boolean {
    if (localStorageItem === 'su_admin') {
      return true
    } else {
      return false
    }
  }


  logout() {
    this.setToken(null)
    localStorage.clear()
  }

  register(user: User) {
    return this.http.post<User>('/api/auth/register', user)
  }
}

