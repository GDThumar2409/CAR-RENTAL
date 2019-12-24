import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOffers } from './IOffers';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferserviceService {

  constructor(private http: HttpClient) { }

  getoffers():Observable<IOffers[]>{
    return this.http.get<IOffers[]>("http://localhost:8000/alloffers")
  }

  savedetail(offer:IOffers):Observable<any>{
    console.log(offer);
    return this.http.post("http://localhost:8000/addoffer",offer).pipe(map(res => res));
  }

  deleteoffer(offer:string):Observable<any>{
    console.log(offer);
    return this.http.delete<any>("http://localhost:8000/deleteoffer/"+offer)
  }

  getoffer(name):Observable<IOffers>{
    console.log("in offer service");
    console.log(name);
    return this.http.get<IOffers>("http://localhost:8000/getoffer/"+name);
  }

  putoffer(offer:IOffers):Observable<any>{
    return this.http.put<IOffers>("http://localhost:8000/updateoffer/",offer);
  }
}
