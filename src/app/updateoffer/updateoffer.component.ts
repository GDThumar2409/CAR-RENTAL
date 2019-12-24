import { Component, OnInit } from '@angular/core';
import { CarserviceService } from '../carservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferserviceService } from '../offerservice.service';
import { IOffers } from '../IOffers';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-updateoffer',
  templateUrl: './updateoffer.component.html',
  styleUrls: ['./updateoffer.component.css']
})
export class UpdateofferComponent implements OnInit {

  name:string;
  discount:string;
  discription:string;
  offer:IOffers;
  constructor(private offerservice:OfferserviceService,private route:ActivatedRoute,private cookiservice:CookieService,private router:Router) { }

  ngOnInit() {
    if(!this.cookiservice.check("emailid")){
      this.router.navigate(['']);
    }
    this.name=this.route.snapshot.paramMap.get('name');
    console.log(this.name)
    this.offerservice.getoffer(this.name).subscribe(res => {this.offer=res;
    console.log(this.offer);
    this.name=this.offer.name;
     this.discription=this.offer.Discription;
     this.discount=this.offer.Discount;
    });
  }


  updateoffer(offer:IOffers){
    this.offerservice.putoffer(offer).subscribe(res => res);
    alert('offer updated!')
  }

}
