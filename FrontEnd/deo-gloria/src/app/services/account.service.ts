import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subject, Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
const signupUrl: string = 'http://localhost:3000/api/signup';
const loginUrl: string = 'http://localhost:3000/api/login';
const logoutUrl: string = 'http://localhost:3000/api/logout';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly authenticated$: Observable<boolean> = this._authenticated$.asObservable();

  public rand: number;

  constructor(private http: HttpClient) {
    console.log("Creating new AccountService")
    this.rand = Math.random();
  }

  signUp(username: string, password: string) {
    let credentials = { 'username': username, 'password': password };
    this.http.post<any>(signupUrl, credentials, httpOptions)
      .subscribe(res => console.log(res));
  }

  logIn(username: string, password: string) {
    let credentials = { 'username': username, 'password': password };
    this.http.post<any>(loginUrl, credentials, httpOptions)
      .subscribe(res => {
        console.log(res);
        if (res.authenticated) {
          this._authenticated$.next(true);
        }
      });
  }

  logOut() {
    this.http.post<any>(logoutUrl, {}, httpOptions)
      .subscribe(res => {
        console.log(res);
        if (res.authenticated === false) {
          this._authenticated$.next(false);
        }
      });
  }

  isLoggedIn(): boolean {
    return this._authenticated$.getValue();
  }
}
