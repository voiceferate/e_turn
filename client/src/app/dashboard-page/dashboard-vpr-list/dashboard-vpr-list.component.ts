import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Vpr } from 'src/app/shared/interfaces';
import { VprsServise } from 'src/app/shared/servises/vprs.servise';

@Component({
  selector: 'app-dashboard-vpr-list',
  templateUrl: './dashboard-vpr-list.component.html',
  styleUrls: ['./dashboard-vpr-list.component.css']
})
export class DashboardVprListComponent implements OnInit,OnChanges {
  
  
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log('regionId:', this.regionId)
    this.vprs$ = this.vprServise.fetch(this.regionId)
  }

  @Input('regionId') regionId: string;

  vprs$: Observable<Vpr[]>

  constructor(private vprServise: VprsServise) { }

  ngOnInit() {

  }



}
