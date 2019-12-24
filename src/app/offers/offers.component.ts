import { Component, OnInit } from '@angular/core';
import {OfferserviceService} from '../offerservice.service'
import { IOffers } from '../IOffers';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private offerservice:OfferserviceService,private router: Router,private cookiservice:CookieService) { }

  name:string;
  discount:string;
  discription:string;
  offers:IOffers[];
  ngOnInit() {
    if(!this.cookiservice.check("emailid")){
      this.router.navigate(['']);
    }
    this.callservice();
  }

  callservice(){
    this.offerservice.getoffers().subscribe(res => this.offers=res);
  }

  delete(name:string){
    console.log(name);
    this.offerservice.deleteoffer(name).subscribe(res => this.confirmresponse(res))
  }

  confirmresponse(res){
    if(res['message']== "Offer removed!"){
      this.offerservice.getoffers().subscribe(res => this.offers=res);
    }
  }
  
}
