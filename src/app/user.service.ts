import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { Users } from './Users'
import { Observable, throwError, of } from 'rxjs';
import { mergeMap, switchMap, retry,   map, catchError, filter, scan,delay } from 'rxjs/operators'; 
import { Type } from '@angular/compiler';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { timer } from 'rxjs';


//HttpErrorResponse, HttpResponse,

export const httpOptions =  {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable(
  //providedIn: 'Type<any>',
)
export class UserService {
  private _url :string = "http://localhost:8000/adduser"
  constructor(private http: HttpClient) { }

  adduser(user:Users):Observable<any> {
    console.log("added")
    console.log(user)
    return this.http.post <any>(this._url,user, httpOptions).pipe(map(res => res))
  }

  checklogin(email_id:string,password:string):Observable<any>{
    return this.http.get<HttpResponse<any>>("http://localhost:8000/login" + "/" + email_id + "/" + password , {observe:'response'}).pipe(map(res => res)) 
  }

  // checkEmailNotTaken(email_id: string) {
  //   return this.http
  //     .get<any>("http://localhost:8000/alluser")
  //     .pipe(delay(1000)
  //     ,map(res => res)
  //     ,map(employees => employees.filter(employee => employee.email_id === email_id))
  //     ,map(employees => !employees.length));
  // }


  searchUser(text) {
    // debounce
    console.log(text)
    return timer(1000)
      .pipe(
        switchMap(() => {
          // Check if username is available
          return this.http.get<HttpResponse<any>>("http://localhost:8000/find/"+text , {observe:'response'})
        })
      );
  }

  userValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUser(control.value)
        .pipe(
          map(res => {
            // if username is already taken
            if (res.status != 400) {
              // return error
              console.log("true");
              return { 'userNameExists': true};
            }
            else{
              console.log("false");
              return { 'userNameExists': false }
            }
          })
        );
    };

  }
}
