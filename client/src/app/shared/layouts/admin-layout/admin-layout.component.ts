import { Component, OnInit } from '@angular/core';
import { AuthServise } from '../../servises/auth.servise';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  role: boolean = null


  links = [
    {url: '/regions', name: 'Області', forAdmin: true},
    {url: '/vprs-regions', name: 'Пункти реєстрації', forAdmin: true},
    {url: '/holidays', name: 'Вихідні', forAdmin: true},
    {url: '/administrators', name: 'Адміністратори', forAdmin: true},
  ]

  constructor(private auth: AuthServise,
              private router: Router) {
}

  ngOnInit() {
    this.role = this.auth.isSuAdmin(localStorage.getItem('role'))
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
