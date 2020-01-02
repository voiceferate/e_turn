import { Component, OnInit } from '@angular/core';
import { AuthServise } from './shared/servises/auth.servise';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{
  
  
  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken)
    }
  }


  title = 'КНЕДП АЦСКІДД';

  constructor(private auth: AuthServise) {}
}
