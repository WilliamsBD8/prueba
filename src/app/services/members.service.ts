import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedules } from '../interface/schedules';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private url = `${this.services.getUrl()}schedule/`;
  private id = this.services.getIdUser();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private services: ServicesService, private httpClient: HttpClient) { }

  getAll(): Observable<Schedules[]>{
    return this.httpClient.get<Schedules[]>(`${this.url}${ this.id }`);
  }

  create(agenda:string): Observable<string>{
    return this.httpClient.post<string>(`${this.url}create`, JSON.stringify(agenda), this.httpOptions)
  }

  delete(id:number): Observable<Schedules>{
    return this.httpClient.get<Schedules>(`${this.url}delete/${id}`)
  }

}
 