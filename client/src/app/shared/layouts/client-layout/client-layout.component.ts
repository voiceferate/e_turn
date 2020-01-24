import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialServise } from '../../classes/material.servise';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit{


  @ViewChild('modal', {static: false} ) modalRef: ElementRef

  

  modal: MaterialInstance
  modalVisible = false

  constructor() { }

  ngOnInit() {
  }

  showDocumentsList() {
    console.log('docs')
    this.modal = MaterialServise.initModal(this.modalRef)
    this.modal.open()
    this.modalVisible = true
  }
}
