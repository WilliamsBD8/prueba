import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cursos } from '../interface/cursos';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private url = `${this.services.getUrl()}cursos/`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient, private services: ServicesService) { }

  getAll(): Observable<Cursos[]>{
    return this.httpClient.get<Cursos[]>(`${this.url}`);
  }

  create(curso:Cursos): Observable<Cursos>{
    return this.httpClient.post<Cursos>(`${this.url}create`, JSON.stringify(curso), this.httpOptions)
  }

  edit(curso:Cursos): Observable<Cursos>{
    return this.httpClient.post<Cursos>(`${this.url}edit`, JSON.stringify(curso), this.httpOptions)
  }

  delete(id:number): Observable<Cursos>{
    return this.httpClient.get<Cursos>(`${this.url}delete/${id}`)
  }
}
