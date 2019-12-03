 import { Injectable } from '@angular/core';
 import {HttpClient, HttpHeaders} from '@angular/common/http';
 import {User} from '../shared/user';
 import { Router } from '@angular/router';
 import {tap} from 'rxjs/internal/operators/tap';
 import {Employe} from '../shared/employe';
 import { map } from 'rxjs/operators';


 @Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPoint = 'http://localhost:3000/api/auth';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  storageKey = 'ugsecuriteapplication';
  currentUser = '';
  constructor(private http: HttpClient, private router: Router) { }

  logIn(payload: User) {
    return this.http.post<User>(this.endPoint, payload, {headers: this.headers})
      .pipe(
        tap(data => console.log('Payload: ', JSON.stringify(data)))
      );
  }

  setToken(token: any) {
    localStorage.setItem(this.storageKey, token);
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  doLogOut() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }
}
