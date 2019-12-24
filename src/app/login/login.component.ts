import { Component, OnInit } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import {UserService} from '../user.service';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpResponse } from '@angular/common/http';
import { IRes } from '../IRes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  email_id:string;
  password:string;
  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router:Router,
    private cookieservice:CookieService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      password: ['', Validators.required],
      email_id: [
        '',
        [Validators.required, Validators.email],
        //this.validateEmailNotTaken.bind(this),
        this.userservice.userValidator(),
      ]
    });
  }

  // .pipe(map(res => {
  //   if(res['message']== "login successfull"){
  //     this.cookieservice.set("emailid",this.email_id);
  //     this.router.navigate(['/home']);
  //   }
  // }))

  validate(){
    console.log(this.email_id);
    console.log(this.password);
    if(this.email_id=="admin" && this.password=="admin"){
      this.router.navigate(['/carhome']);
      this.cookieservice.set("emailid",this.email_id);
    }
    this.userservice.checklogin(this.email_id,this.password).subscribe( (res:HttpResponse<IRes>) => {
      this.sendredirect(res);
    })
  }

  sendredirect(res:HttpResponse<IRes>){
    console.log(res);
    console.log(res.body['message']);
      if(res.body['message'] == "login successfull"){
        console.log("Inside If");
        this.cookieservice.set("emailid",this.email_id);
        this.router.navigate(['/home']);
      }
  }
  // validateEmailNotTaken(control: AbstractControl) {
  //   return this.userservice.checkEmailNotTaken(control.value).pipe(map(employees => {
  //     return employees ? { status : "NOT VALID"} : { status : "VALID" };
  //   }));
  // }

}
