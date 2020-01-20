import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecaptchaServise {


  constructor(private http: HttpClient) {}
  
  check(resolvedCaptcha: string): Observable<any> {
    return this.http.post('/api/recaptcha/check', {resolvedCaptcha: resolvedCaptcha})
  }


}

