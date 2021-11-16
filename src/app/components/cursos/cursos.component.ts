import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/interface/auth';
import { Cursos } from 'src/app/interface/cursos';
import { AddMembersService } from 'src/app/services/add-members.service';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  url: string = '';
  cursos: Cursos[] = [];
  teachers: Auth[] = [];
  miembros: Auth[] = [];

  members: Auth[] = [];

  form : FormGroup = new FormGroup({
    name:  new FormControl('', [ Validators.required ]),
    teacher: new FormControl('', [ Validators.required ]),
    id: new FormControl('', []),
    position: new FormControl('', []),
  });
  formMember : FormGroup = new FormGroup({
    user_id:  new FormControl('', [ Validators.required ]),
    curso_id: new FormControl('', []),
  });

  constructor(public cursoService: CursosService, public addMemberServices: AddMembersService) { }

  ngOnInit(): void {
    this.cursoService.getAll().subscribe((res: any[]) => {
      this.cursos = res[0];
      this.teachers = res[1];
      this.miembros = res[2];
    });

  }

  get f(){
    return this.form.controls;
  }

  get fm(){
    return this.formMember.controls;
  }

  create(){
    this.cursoService.create(this.form.value).subscribe( curso => {
      this.cursos.unshift(curso);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Curso creado',
        showConfirmButton: false,
        timer: 1500
      })
      this.form.reset();
    })
  }

  buttonEdit(id:number){
    this.f['name'].setValue(this.cursos[id].name);
    this.f['teacher'].setValue(this.cursos[id].members[0].user.id);
    this.f['id'].setValue(this.cursos[id].id);
    this.f['position'].setValue(id);
  }

  addMemberM(id:number){
    this.fm['curso_id'].setValue(id);
  }

  viewMembers(id:number){
    this.members = this.cursos[id].members;
  }
  addMember(){
    this.addMemberServices.create(this.formMember.value).subscribe( (cursos: any) => {
      if(cursos.status){
        this.cursos = cursos[0];
        Swal.fire(
          'Agregado!',
          'Nuevo miembro',
          'success'
        );
        this.formMember.reset();
      }else{
        Swal.fire(
          cursos.message,
          '',
          'warning'
        )
      }
    })
  }

  edit(){
    
    this.cursoService.edit(this.form.value).subscribe( salon => {
      let position = this.form.value.position;
      this.cursos[position] = salon;
    })
  }

  delete(id:number){
    Swal.fire({
      title: '¿Esta seguro de eliminar el curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.delete(id).subscribe(res => {
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

  deleteMember(id:number){
    Swal.fire({
      title: '¿Esta seguro de eliminar el miembro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.addMemberServices.delete(id).subscribe( (res: any) => {
          this.cursos = res;
          this.members = this.members.filter(item => item.id !== id);
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
