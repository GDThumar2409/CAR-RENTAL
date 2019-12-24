import { Injectable } from '@angular/core';
import { ITrip } from './ITrip';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TripserviceService {

  constructor(private http:HttpClient) { }

  savedetail(trip:ITrip):Observable<any>{
    console.log(trip);
    return this.http.post("http://localhost:8000/addtrip",trip).pipe(map(res => res));
  }
}
