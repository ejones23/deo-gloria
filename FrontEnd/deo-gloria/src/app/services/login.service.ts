import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
const loginUrl: string = 'http://localhost:3000/api/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  logIn(username: string, password: string) {
    let credentials = { 'username': username, 'password': password };
    this.http.post<any>(loginUrl, credentials, httpOptions)
      .subscribe(res => console.log(res));
  }
}
