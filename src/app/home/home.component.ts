import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    //'node_modules/bootstrap/dist/css/bootstrap.min.css',
    // 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
    // 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    // 'https://kit.fontawesome.com/a076d05399.js',
    // 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
    // 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
    './home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookieservice:CookieService) { }
  emailid=this.cookieservice.get("emailid");
  ngOnInit() {
  }

}
