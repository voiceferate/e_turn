import { Component, OnInit } from '@angular/core';
import { RegionsServise } from '../shared/servises/regions.servise';
import { Observable } from 'rxjs';
import { Region } from '../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  regions$: Observable<Region[]>
  selectedRegion: string

  constructor(private regionServise: RegionsServise ) { }

  ngOnInit() {
    this.regions$ = this.regionServise.fetch()
  }

  selectRegion(regionId) {
    this.selectedRegion = regionId
  }

}
