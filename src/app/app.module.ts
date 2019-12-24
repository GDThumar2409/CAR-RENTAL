import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SmoothScrollToDirective, SmoothScrollDirective } from "node_modules/ng2-smooth-scroll";
import { FormsModule }   from '@angular/forms';
//import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule,HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
//import { HttpClient } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule } from '@angular/router';
import {UserService} from './user.service';
import { Users} from './Users';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { BookcarComponent } from './bookcar/bookcar.component';
import { CarserviceService } from './carservice.service';
import {OfferserviceService} from './offerservice.service'
import { TopnavComponent } from './topnav/topnav.component';
import { CarhomeComponent } from './carhome/carhome.component';
import { AddcarComponent } from './addcar/addcar.component';
import { UpdatecarComponent } from './updatecar/updatecar.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { OffersComponent } from './offers/offers.component';
import { UpdateofferComponent } from './updateoffer/updateoffer.component';
import { AddofferComponent } from './addoffer/addoffer.component';
import { AlloffersComponent } from './alloffers/alloffers.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes : Routes = [ 
  { path: '', redirectTo: 'home', pathMatch: 'full'}, 
  { path: 'home', component: HomeComponent}, 
  {path: 'login' , component: LoginComponent},
  {path: 'signup' , component:SignupComponent},
  {path: 'error/:message' , component:ErrorComponent},
  {path: 'bookcar' , component:BookcarComponent},
  { path: 'addcar', component: AddcarComponent},
  {path: 'carhome' , component: CarhomeComponent},
  {path: 'updatecar/:name' , component: UpdatecarComponent},
  { path: 'addoffer', component: AddofferComponent},
  {path: 'offers' , component: OffersComponent}, //admin
  {path: 'alloffers' , component: AlloffersComponent}, //user
  {path: 'updateoffer/:name' , component: UpdateofferComponent},
  {path: 'checkout/:name' , component: CheckoutComponent},
  //{ path: '**', component: DefaultPageComponent} // ** should be the last one 
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    BookcarComponent,
    TopnavComponent,
    CarhomeComponent,
    AddcarComponent,
    UpdatecarComponent,
    FileSelectDirective,
    OffersComponent,
    AddofferComponent,
    UpdateofferComponent,
    AlloffersComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //HttpClient,
    // HttpErrorResponse,
    // HttpResponse,
    // HttpHeaders,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService,CookieService,CarserviceService,OfferserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
