import { MaterialInstance, MaterialServise } from './../../classes/material.servise';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthServise } from '../../servises/auth.servise';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {


  @ViewChild('sidenav', {static: false}) sidenavRef: ElementRef

  role: boolean = null
  sidenav: MaterialInstance


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

  ngAfterViewInit(): void {
    console.log(this.sidenavRef)
    this.sidenav = MaterialServise.initSidenav(this.sidenavRef, {})


  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
  
  runCustom() {
    console.log(this.sidenavRef)

    this.sidenav.open()
  }

}
