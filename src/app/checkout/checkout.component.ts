import { Component, OnInit } from '@angular/core';
import { ICar } from '../ICar';
import { ActivatedRoute, Router } from '@angular/router';
import { CarserviceService } from '../carservice.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private route:ActivatedRoute,private carservice:CarserviceService,private router:Router,private cookiservice:CookieService) { }

  name:string;
  car:ICar;

  class:string;
  fuelType:string;
  transmission:string;
  seats:number;
  //photo:File;
  //photopath:string;
  //filedata:any;
  photoname:String;
  filestatus:number;

  ngOnInit() {
    
if(!this.cookiservice.check("emailid")){
  this.router.navigate(['']);
}
    this.name=this.route.snapshot.paramMap.get('name');
    console.log(this.name)
    this.carservice.getcar(this.name).subscribe(res => {this.car=res;
    console.log(this.car);
    this.name=this.car.name;
     this.fuelType=this.car.fuelType;
     this.transmission=this.car.transmission;
     this.class=this.car.class;
     this.seats=this.car.seats;
     this.photoname=this.car.photoname;
    });

  }

}
