import { Component, OnInit } from '@angular/core';
import { IOffers } from '../IOffers';
import { OfferserviceService } from '../offerservice.service';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-addoffer',
  templateUrl: './addoffer.component.html',
  styleUrls: ['./addoffer.component.css']
})
export class AddofferComponent implements OnInit {

  constructor(private offerservice:OfferserviceService,private router:Router,private cookiservice:CookieService) { }

  ngOnInit() {
    if(!this.cookiservice.check("emailid")){
      this.router.navigate(['']);
    }
  }

  addoffer(offer:IOffers){
    this.offerservice.savedetail(offer).subscribe(res => {if(res['message']=="Offer Already In System"){
      this.router.navigate(['/error',res['message']]);
    }
  });
  alert('offer added');
  }

}
