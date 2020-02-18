import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialServise } from '../../shared/classes/material.servise';

@Component({
  selector: 'app-documents-list-page',
  templateUrl: './documents-list-page.component.html',
  styleUrls: ['./documents-list-page.component.css']
})
export class DocumentsListPageComponent implements OnInit, AfterViewInit {

  @ViewChild('collapsible') collapsibleRef: ElementRef

  collapsible: MaterialInstance

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.collapsible = MaterialServise.initCollapsible(this.collapsibleRef, {})
    this.collapsible.close(0)
  }

}
