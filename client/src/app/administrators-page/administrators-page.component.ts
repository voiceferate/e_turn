import { AdminService } from './../shared/servises/admin.service';
import { User } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { AuthServise } from '../shared/servises/auth.servise';
import { Observable } from 'rxjs';
import { RegionsServise } from '../shared/servises/regions.servise';

@Component({
  selector: 'app-administrators-page',
  templateUrl: './administrators-page.component.html',
  styleUrls: ['./administrators-page.component.css']
})
export class AdministratorsPageComponent implements OnInit {

  users$: Observable<User[]>

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.users$ = this.adminService.fetch()
  }

}
