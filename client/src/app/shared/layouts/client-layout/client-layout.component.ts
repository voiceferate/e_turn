import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router           
    ) { }

  ngOnInit() {
    this.router.events.subscribe( (val: RouterEvent) => {
      if (val instanceof NavigationEnd) {
        if (this.sidenav) {
          this.sidenav.destroy()
        }
      }
    } )
  }

  ngAfterViewInit(): void {
    // this.helperText = MaterialServise.initHelperText(this.tapTargetRef, {})
  }

  showDocumentsList() {
    this.modal = MaterialServise.initModal(this.modalRef)
    this.modal.open()
    this.modalVisible = true
  }

  initSidenav() {
    this.sidenav = MaterialServise.initSidenav(this.sidenavRef, {})
  }


}
