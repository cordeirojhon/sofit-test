import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: String): Observable<boolean> {
    let body: any = {};
    body['email'] = email;

    return this.http.get(
      'https://sofit-front-challenge.herokuapp.com/start/'+email,
      body).pipe(
        map((response: any) => {
          return response;
        })
      )
  }
  // isLoggedIn(token: string){
  //   return this.http.get()
  // }
}
