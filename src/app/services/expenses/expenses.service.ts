import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ExpensesService {

  url:string = 'https://sofit-front-challenge.herokuapp.com/expenses';
  options = {
    headers: new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
  }


  constructor(private http: HttpClient) { }

  getExpenses(page: number, perPage: number): Observable<boolean> {
    return this.http.get(
        this.url+'?page='+page+'&perPage='+perPage,
        this.options
      ).pipe(
        map((response: any) => {
          return response;
        })
      )
  }

  setNewExpenses(data: any): Observable<boolean> {
    return this.http.post(
        this.url,
        data,
        this.options
      ).pipe(
        map((response: any) => {
          return response;
        })
      )
  }

  editExpenses(id: string, data: any): Observable<boolean> {
    return this.http.put(
        this.url+'/'+id,
        data,
        this.options
      ).pipe(
        map((response: any) => {
          return response;
        })
      )
  }

  getExpense(id: string): Observable<boolean> {
    return this.http.get(
        this.url+'/'+id,
        this.options
      ).pipe(
        map((response: any) => {
          return response;
        })
      )
  }

  excludeExpenses(id: string): Observable<boolean> {
    return this.http.delete(
        this.url+'/'+id,
        this.options
      ).pipe(
        map((response: any) => {
          return response;
        })
      )
  }
}
