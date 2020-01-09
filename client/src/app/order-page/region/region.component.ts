import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Region } from 'src/app/shared/interfaces';
import { RegionsServise } from 'src/app/shared/servises/regions.servise';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit, AfterViewInit {
  
  // regions$: Observable<Region[]>
  regions: Region[] = []
  loading = false


  constructor(private regionServise: RegionsServise) { }

  ngOnInit() {
    // this.regions$ = this.regionServise.getAllActive()
    this.regionServise.getAllActive().subscribe((regions) => {
      this.regions = regions
    })
  }

  ngAfterViewInit() {
  }
 
}
