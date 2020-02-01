import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialServise } from '../../classes/material.servise';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit, AfterViewInit{



  @ViewChild('modal', {static: false} ) modalRef: ElementRef
  @ViewChild('sidenav', {static: false} ) sidenavRef: ElementRef
  
  modal: MaterialInstance
  sidenav: MaterialInstance
  modalVisible = false

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // this.helperText = MaterialServise.initHelperText(this.tapTargetRef, {})
  }

  showDocumentsList() {
    console.log('docs')
    this.modal = MaterialServise.initModal(this.modalRef)
    this.modal.open()
    this.modalVisible = true
  }

  initSidenav() {
    this.sidenav = MaterialServise.initSidenav(this.sidenavRef, {})
  }


}
