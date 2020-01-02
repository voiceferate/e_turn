import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from 'src/app/shared/interfaces';
import { RegionsServise } from 'src/app/shared/servises/regions.servise';

@Component({
  selector: 'app-vprs-regions-page',
  templateUrl: './vprs-regions-page.component.html',
  styleUrls: ['./vprs-regions-page.component.css']
})
export class VprsRegionsPageComponent implements OnInit {

  regions$: Observable<Region[]>

  constructor(private regionServise: RegionsServise) { }

  ngOnInit() {
    this.regions$ = this.regionServise.fetch()
  }
}
