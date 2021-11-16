import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historial } from '../interface/historial';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private url = `${this.services.getUrl()}historial/`;
  private id = '';

  constructor(private services: ServicesService, private httpClient: HttpClient) { }

  getAll(): Observable<Historial[]>{
    this.id = `${this.services.getIdUser()}`;
    return this.httpClient.get<Historial[]>(`${this.url}${ this.id }`);
  }
}
 