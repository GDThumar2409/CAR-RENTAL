import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Users } from '../Users';
import { IRes } from '../IRes';
import { CookieService } from 'ngx-cookie-service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email_id: string;
  firstname: string;
  lastname:string;
	phoneno: Number;
  password: string;
  rpassword:string;

  constructor(private userservice: UserService,private cookieservice:CookieService,private router: Router) { }

  ngOnInit() {
  }

  addUser(user:Users){
    if(this.password==this.rpassword){
      console.log("added");
      this.userservice.adduser(user).subscribe( (res:HttpResponse<IRes>)  => {this.setcookie(res);
      } );
    }
  }

  setcookie(res:HttpResponse<IRes>):void{
    console.log("Inside SetCookie");
    console.log(res);
    if(res['message']== "Employee record saved successfully"){
      console.log("Inside IF")
      this.cookieservice.set("emailid",this.email_id);
      this.router.navigate(['/home']);
    }
    else if(res['message']=="Email Already In System"){
      console.log("Email Exist");
      this.router.navigate(['/error',res['message']]);
    }
  }

}
