import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Users } from '../Users';
import { IRes } from '../IRes';
import { CookieService } from 'ngx-cookie-service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ITrip } from '../ITrip';
import { TripserviceService } from '../tripservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  startdate:string;
  starttime:string;
  enddate:string;
  endtime:string;
  constructor(private tripservice:TripserviceService,private userservice: UserService,private cookieservice:CookieService,private router: Router,) { }
  email_id: string=this.cookieservice.get("emailid");
  // firstname: string;
  // lastname:string;
	// phoneno: Number;
  // password: string;
  // rpassword:string;
  
  

  //ob={}
  response:HttpResponse<IRes>;
  //fine:boolean;
  ck=this.cookieservice.get("emailid");
  check:boolean=this.cookieservice.check("emailid");
  // addUser(user:Users){
  //   // console.log("hii");
  //   // console.log(user.lastname);
  
  //   if(this.password==this.rpassword){
  //     console.log("added");
      
  //     this.userservice.adduser(user).subscribe( (res:HttpResponse<IRes>)  => {this.setcookie(res);
  //       //this.router.navigateByUrl('/');
  //     } );
  //     // console.log("response is:");
  //     // console.log(this.fine);
  //     // if(this.fine == true ){
  //     //     this.cookieservice.set("emailid",user.email_id,3);
  //     //     console.log("hii gunjan");
  //     //     console.log(this.cookieservice.get("emailid"));
  //     // }
  //   }
    
  // }
  ngOnInit() {
    
  }

  // setcookie(res:HttpResponse<IRes>):void{
  //   console.log("Inside SetCookie");
  //   console.log(res);
  //   if(res['message']== "Employee record saved successfully"){
  //     console.log("Inside IF")
  //     this.cookieservice.set("emailid",this.email_id);
  //     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate(['/home']);
      
  //   }
  // }

  addtotrip(trip:ITrip){
    console.log(trip);
    this.tripservice.savedetail(trip).subscribe(res => res);
    this.router.navigate(['/bookcar']);
  }

  logout(){
    console.log("Inside logout");
    this.cookieservice.set("emailid",null,-1);
    //this.router.navigate(['']);
    location.reload();
  }

}
