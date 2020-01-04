import { Component, OnInit } from '@angular/core';
import { HolidaysServise } from '../shared/servises/holidays.servise';
import { Observable } from 'rxjs';
import { Holiday } from '../shared/interfaces';

@Component({
  selector: 'app-holidays-page',
  templateUrl: './holidays-page.component.html',
  styleUrls: ['./holidays-page.component.css']
})
export class HolidaysPageComponent implements OnInit {

  holidays$: Observable<Holiday[]>
  
  constructor(private holidaysServise: HolidaysServise) { }

  ngOnInit() {
    this.holidays$ = this.holidaysServise.fetch()

    this.holidays$.subscribe( (holidays) => {
      console.log(holidays)
    })
  }



}
