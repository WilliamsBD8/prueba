import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";

import { ServicesService } from "./services.service";

import { Salons } from "../interface/salons";

@Injectable({
  providedIn: 'root'
})
export class SalonsService {
  
  private url = `${this.services.getUrl()}salones/`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient, public services: ServicesService, ) {
  }

  getAll(): Observable<Salons[]>{
    return this.httpClient.get<Salons[]>(`${this.url}`);
  }

  create(salon:Salons): Observable<Salons>{
    return this.httpClient.post<Salons>(`${this.url}create`, JSON.stringify(salon), this.httpOptions)
  }

  edit(salon:Salons): Observable<Salons>{
    return this.httpClient.post<Salons>(`${this.url}edit`, JSON.stringify(salon), this.httpOptions)
  }

  delete(id:number): Observable<Salons>{
    return this.httpClient.get<Salons>(`${this.url}delete/${id}`)
  }

}
