import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cursos } from '../interface/cursos';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class AddMembersService {

  private url = `${this.services.getUrl()}add-member/`;
  private id = this.services.getIdUser();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private services: ServicesService, private httpClient: HttpClient) { }

  getAll(): Observable<Cursos[]>{
    return this.httpClient.get<Cursos[]>(`${this.url}${ this.id }`);
  }

  create(agenda:string): Observable<string>{
    return this.httpClient.post<string>(`${this.url}create`, JSON.stringify(agenda), this.httpOptions)
  }

  delete(id:number): Observable<Cursos>{
    return this.httpClient.get<Cursos>(`${this.url}delete/${id}`)
  }

}
 