import { Component, OnInit } from '@angular/core';
import { Historial } from 'src/app/interface/historial';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  url: string = '';
  historial: Historial[] = [];



  constructor( private historialService: HistorialService ) { }

  ngOnInit(): void {
    this.historialService.getAll().subscribe((agendas: any[]) => {
      this.historial = agendas;
    });
  }

}
