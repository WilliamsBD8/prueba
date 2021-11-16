import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cursos } from 'src/app/interface/cursos';
import { Salons } from 'src/app/interface/salons';
import { Schedules } from 'src/app/interface/schedules';
import { SchedulesService } from 'src/app/services/schedules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  url: string = '';
  agendas: Schedules[] = [];
  salones: Salons[] = [];
  cursos: Cursos[] = [];

  form : FormGroup = new FormGroup({
    date:  new FormControl('', [ Validators.required ]),
    start:  new FormControl('', [ Validators.required ]),
    end:  new FormControl('', [ Validators.required ]),
    salon_id:  new FormControl('', [ Validators.required ]),
    curso_id:  new FormControl('', [ Validators.required ]),
    id: new FormControl('', []),
    position: new FormControl('', []),
  });

  constructor(
    public agendaService: SchedulesService
  ) { }

  ngOnInit(): void {
    this.agendaService.getAll().subscribe((agendas: any[]) => {
      this.agendas = agendas[0];
      this.salones = agendas[1];
      this.cursos = agendas[2];
    });
  }

  get f(){
    return this.form.controls;
  }

  create(){
    this.agendaService.create(this.form.value).subscribe( (agenda: any) => {
      if(agenda.status == false){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: agenda.message,
        })
      }else{
        this.agendas.unshift(agenda.agenda);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Agenda creada',
          showConfirmButton: false,
          timer: 1500
        })
        this.form.reset();
      }
    })
  }

  buttonEdit(id:number){
    this.f['date'].setValue(this.agendas[id].date);
    this.f['start'].setValue(this.agendas[id].start);
    this.f['end'].setValue(this.agendas[id].end);
    this.f['salon_id'].setValue(this.agendas[id].salon_id);
    this.f['curso_id'].setValue(this.agendas[id].curso_id);
    this.f['id'].setValue(this.agendas[id].id);
    this.f['position'].setValue(id);
  }

  edit(){
    this.agendaService.edit(this.form.value).subscribe( (agenda: any) => {
      if(agenda.status == false){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: agenda.message,
        })
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Agenda editada',
          showConfirmButton: false,
          timer: 1500
        })
        let position = this.f['position'].value;
        this.agendas[position] = agenda;
      }
    })
  }

  delete(id:number){
    Swal.fire({
      title: '¿Esta seguro de eliminar la agenda?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendaService.delete(id).subscribe(res => {
          this.agendas = this.agendas.filter(item => item.id !== id);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })
    
  }

}
