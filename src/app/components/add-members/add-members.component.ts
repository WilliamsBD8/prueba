import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cursos } from 'src/app/interface/cursos';
import { Schedules } from 'src/app/interface/schedules';
import { AddMembersService } from 'src/app/services/add-members.service';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {

  url: string = '';
  cursos: Cursos[] = [];

  id: number = 0; 

  form : FormGroup = new FormGroup({
    code:  new FormControl('', [ Validators.required ]),
    user_id: new FormControl('', []),
    id: new FormControl('', []),
    position: new FormControl('', []),
  });

  constructor(private addMService: AddMembersService, private serviceServices: ServicesService) { }

  ngOnInit(): void { 
    this.addMService.getAll().subscribe((cursos: any[]) => {
      this.cursos = cursos;
    });
  }

  get f(){
    return this.form.controls;
  }

  create(){
    this.id = this.serviceServices.getIdUser();
    this.f['user_id'].setValue(this.id);
    this.addMService.create(this.form.value).subscribe( (curso: any) => {
      if(curso.status == false){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: curso.message,
        })
      }else{
        this.cursos.unshift(curso.curso);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: curso.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.form.reset();
      }
    })
  }

  delete(id:number){
    Swal.fire({
      title: '¿Esta seguro de salir del curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.id = this.serviceServices.getIdUser();
        this.addMService.delete(id).subscribe(res => {
          this.cursos = this.cursos.filter(item => item.id !== id);
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
