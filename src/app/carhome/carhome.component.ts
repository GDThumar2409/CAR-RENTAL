import { Component, OnInit } from '@angular/core';
import { CarserviceService } from '../carservice.service'
import { ICar } from '../ICar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-carhome',
  templateUrl: './carhome.component.html',
  styleUrls: ['./carhome.component.css']
})
export class CarhomeComponent implements OnInit {

  cars:ICar[];
  size:number;
  row:number;
  arr:ICar[][];
  constructor(private carservice:CarserviceService,private router:Router,private cookiservice:CookieService) { }

  ngOnInit() {
    if(!this.cookiservice.check("emailid")){
      this.router.navigate(['']);
    }
    this.callservice();
    
  }

  

  callservice(){
    this.carservice.getcars().subscribe(rescar => { this.cars=rescar;
      
      })
  }

  delete(carname:string){
    this.carservice.deletecar(carname).subscribe(res => this.confirmresponse(res))
  }

  confirmresponse(res){
    if(res['message']== "Car removed!"){
      this.carservice.getcars().subscribe(res => this.cars=res);
    }
  }

}
