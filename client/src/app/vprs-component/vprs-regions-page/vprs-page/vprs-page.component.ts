import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vpr } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { RegionsServise } from 'src/app/shared/servises/regions.servise';
import { VprsServise } from 'src/app/shared/servises/vprs.servise';
import { MaterialServise } from 'src/app/shared/classes/material.servise';

@Component({
  selector: 'app-vprs-page',
  templateUrl: './vprs-page.component.html',
  styleUrls: ['./vprs-page.component.css']
})
export class VprsPageComponent implements OnInit {


  vprs$: Observable<Vpr[]>
  regionId: string

  constructor(private route: ActivatedRoute,
              private vprServise: VprsServise) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      regionId => {
        this.regionId = regionId.regionId
        this.vprs$ = this.vprServise.fetch(regionId.regionId)
      })
      error => {
        MaterialServise.toast(error.error.message)
      }
  }
}