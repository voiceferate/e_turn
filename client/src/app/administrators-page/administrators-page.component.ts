import { Component, OnInit } from '@angular/core';
import { AuthServise } from '../shared/servises/auth.servise';

@Component({
  selector: 'app-administrators-page',
  templateUrl: './administrators-page.component.html',
  styleUrls: ['./administrators-page.component.css']
})
export class AdministratorsPageComponent implements OnInit {

  constructor(private auth: AuthServise) { }

  ngOnInit() {
    console.log(this.auth.getRole())
  }

}
