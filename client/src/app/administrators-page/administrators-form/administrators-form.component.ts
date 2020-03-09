import { User } from './../../shared/interfaces';
import { AdminService } from './../../shared/servises/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { MaterialServise } from 'src/app/shared/classes/material.servise';

@Component({
  selector: 'app-administrators-form',
  templateUrl: './administrators-form.component.html',
  styleUrls: ['./administrators-form.component.css']
})
export class AdministratorsFormComponent implements OnInit {

  form: FormGroup
  user$: Observable<User>
  userId: string

  constructor(private route: ActivatedRoute,
              private adminServise: AdminService,
              private router: Router ) {}

  ngOnInit() {
    this.form = new FormGroup({
      status: new FormControl(true),
      _id: new FormControl()
    })

    this.form.disable()

    this.route.params
      .pipe( 
        switchMap( (params: Params) => {
          if (params['id']) {
            this.user$ = this.adminServise.getById(params['id'])
            return this.adminServise.getById(params['id'])
          }
            return of(null)
          } 
        )
      )
      .subscribe(
        (user: User) => {
          if (user) {
            this.userId = user._id            
            this.form.patchValue({
              status: user.status
            })
            // this.region = region
            MaterialServise.updateTextInputs()
          }
          this.form.enable()
        },
        error => {
          MaterialServise.toast(error.error.message)
        }
      )

  }


  onSubmit() {
    this.form.disable()

    this.adminServise.update(this.userId, this.form.value.status)
      .subscribe((user) => {
        MaterialServise.toast(`Статус ${user.name}: змінено успішно`)
        this.form.enable()
      })
    
  }

  onDelete(event: Event) {
    event.preventDefault()

    const result = confirm('Ви впевнені що хочете видалити дату вихідного дня?')

    if (!result) {
      return
    }


    this.adminServise.delete(this.userId)
      .subscribe((res) => {
        MaterialServise.toast(res.message)
        
        this.form.enable()
        this.router.navigate(['/administrators'])

      })
  }

}
