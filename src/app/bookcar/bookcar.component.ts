import { Component, OnInit } from '@angular/core';
import { CarserviceService } from '../carservice.service';
import { ICar } from '../ICar';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookcar',
  templateUrl: './bookcar.component.html',
  styleUrls: ['./bookcar.component.css']
})
export class BookcarComponent implements OnInit {

  cars:ICar[];
  constructor(private carservice:CarserviceService,private router:Router,private cookiservice:CookieService) { }


  ngOnInit() {
    if(!this.cookiservice.check("emailid")){
      this.router.navigate(['']);
    }
    this.callservice();
    
  }

  callservice(){
    this.carservice.getcars().subscribe(rescar => { this.cars=rescar;
      console.log(this.cars);
      })
  }
}
