import { Component, OnInit } from '@angular/core';
import { OfferserviceService } from '../offerservice.service';
import { IOffers } from '../IOffers';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alloffers',
  templateUrl: './alloffers.component.html',
  styleUrls: ['./alloffers.component.css']
})
export class AlloffersComponent implements OnInit {

  offers:IOffers[];
  constructor(private offerservice:OfferserviceService,private cookiservice:CookieService,private router:Router) { }

  ngOnInit() {
    if(!this.cookiservice.check("emailid")){
      this.router.navigate(['']);
    }
    this.callservice();
    
  }

  callservice(){
    this.offerservice.getoffers().subscribe(resoff => { this.offers=resoff;
      console.log(this.offers);
      })
  }
}
