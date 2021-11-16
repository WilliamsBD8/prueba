import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Auth } from '../interface/auth';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${ this.services.getUrl() }login/`;
  userToken: string = String(localStorage.getItem('token'));

  private user: any;
  private user$: Subject<Auth[]>;
  httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
  constructor(private services: ServicesService, private httpClien: HttpClient) {
    this.user$ = new Subject();
  }
  login(data: Auth){
    return this.httpClien.post(this.url, JSON.stringify(data), {headers: this.httpOptions})
    .pipe(
      map((token: any) => {
        this.guardarToken(token['access_token']);
        return token;
      })
    )
  }

  private guardarToken(token: string){
    this.userToken = token;
    localStorage.setItem('token', token);
    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('token_day', hoy.getTime().toString());
  }

  guardarUser(token: string){
    let headers = { headers: this.httpOptions.set('Authorization', `Bearer ${token}`) };
    return this.httpClien.get(`${this.url}user`, headers)
    .pipe(
      map((user: any) => {
          this.getUserLocal(user);
          localStorage.setItem('user_api', JSON.stringify(user));
          return [user];
      })
    )
  }

  getToken(){
    this.userToken = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')!) : '';
    return this.userToken;
  }

  autentication(): boolean{
    if(this.userToken.length < 2){
      this.logout();
      return false;
    }
    const expira = Number(localStorage.getItem('token_day'));
    const expira_date = new Date();
    expira_date.setTime(expira);
    if(expira_date >= new Date()) return true;
    else{
      this.logout();
      return false;
    }
  }

  getUserLocal(user: Auth[]){
    this.user = user;
    this.user$.next(this.user);
  }

  getUser$(){
    return this.user$.asObservable();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('token_day');
    localStorage.removeItem('user_api');
    this.user = null;
    this.user$.next(this.user);
  }
}
