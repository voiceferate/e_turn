import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialServise } from '../../shared/classes/material.servise';

@Component({
  selector: 'app-documents-list-page',
  templateUrl: './documents-list-page.component.html',
  styleUrls: ['./documents-list-page.component.css']
})
export class DocumentsListPageComponent implements OnInit, AfterViewInit {

  @ViewChild('collapsible', {static: false} ) collapsibleRef: ElementRef

  collapsible: MaterialInstance

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    console.log('this.collapsibleRef', this.collapsibleRef)
    this.collapsible = MaterialServise.initCollapsible(this.collapsibleRef, {
      onOpenStart: () => {
        console.log('coll open')
      }
    })
  }

}
