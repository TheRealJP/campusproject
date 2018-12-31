import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../_models/user';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  private baseUrl = `http://localhost:3000/api`;
  // private baseUrl = `https://c56155c6-c187-4a60-b29e-a18907bbfd46.mock.pstmn.io/api`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(
      `${this.baseUrl}/login`,
      {username, password},
      {headers: this.headers}).pipe(map(user => {

        if (user) {
          console.log('auth.service:' + JSON.stringify(user));
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }
    ));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.currentUserSubject.next(null);
  }

}
