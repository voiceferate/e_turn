import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import { RegionsServise } from '../shared/servises/regions.servise';
import { Region } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { MaterialServise, MaterialInstance } from '../shared/classes/material.servise';

@Component({
  selector: 'app-regions-page',
  templateUrl: './regions-page.component.html',
  styleUrls: ['./regions-page.component.css']
})
export class RegionsPageComponent implements OnInit {

  regions$: Observable<Region[]>

  constructor(private regionServise: RegionsServise) { }

  ngOnInit() {
    this.regions$ = this.regionServise.fetch()
  }

}
