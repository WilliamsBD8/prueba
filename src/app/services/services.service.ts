import { Injectable } from '@angular/core';
import { Auth } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private url = "http://localhost:8000/api/";
  private user: Auth = JSON.parse(localStorage.getItem('user_api')!);

  constructor() { }

  getUrl(){
    return this.url;
  }

  getIdUser(){
    this.user = JSON.parse(localStorage.getItem('user_api')!);
    return this.user.id;
  }


}
