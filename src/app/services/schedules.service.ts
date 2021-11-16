import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedules } from '../interface/schedules';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  private url = `${this.services.getUrl()}schedule/`;
  private id = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private services: ServicesService, private httpClient: HttpClient) { }

  getAll(): Observable<Schedules[]>{
    this.id = `${this.services.getIdUser()}`;
    return this.httpClient.get<Schedules[]>(`${this.url}${ this.id }`);
  }

  create(agenda:Schedules): Observable<Schedules>{
    return this.httpClient.post<Schedules>(`${this.url}create`, JSON.stringify(agenda), this.httpOptions);
  }

  edit(agenda:Schedules): Observable<Schedules>{
    return this.httpClient.post<Schedules>(`${this.url}edit`, JSON.stringify(agenda), this.httpOptions);
  }

  delete(id:number): Observable<Schedules>{
    this.id = `${this.services.getIdUser()}`;
    return this.httpClient.get<Schedules>(`${this.url}delete/${id}`);
  }
}
