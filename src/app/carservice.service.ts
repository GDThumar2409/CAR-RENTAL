import { Injectable } from '@angular/core';
import { ICar } from './ICar'
import { HttpClient,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const httpOptions =  {
  headers : new HttpHeaders({
    'Content-Type' : 'multipart/form-data'
  })
}

@Injectable()
export class CarserviceService {

  constructor(private http: HttpClient) { }

  savedetail(car:ICar):Observable<any>{
    console.log(car);
    return this.http.post("http://localhost:8000/addcar",car).pipe(map(res => res));
  }

  getcars():Observable<ICar[]>{
    return this.http.get<ICar[]>("http://localhost:8000/allcars")
  }

  deletecar(name):Observable<any>{
    return this.http.delete<any>("http://localhost:8000/deletecar/"+name)
  }

  getcar(name):Observable<ICar>{
    console.log("in car service");
    console.log(name);
    return this.http.get<ICar>("http://localhost:8000/getcar/"+name);
  }

  putcar(car:ICar):Observable<any>{
    return this.http.put<ICar>("http://localhost:8000/updatecar/",car);
  }

}
