import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  message:string;
  constructor(private router:Router,private route:ActivatedRoute,private cookeservice:CookieService) { }

  ngOnInit() {
    this.message=this.route.snapshot.paramMap.get('message');
    if(!this.cookeservice.check('emailid')){
      this.router.navigateByUrl('/home');
    }

  }

}
