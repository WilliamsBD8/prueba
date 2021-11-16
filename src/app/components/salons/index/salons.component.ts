import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SalonsService } from "../../../services/salons.service";
import { Salons } from "../../../interface/salons";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.css']
})
export class SalonsComponent implements OnInit {

  url: string = '';
  salons: Salons[] = [];

  form : FormGroup = new FormGroup({
    name:  new FormControl('', [ Validators.required ]),
    aforo: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
    id: new FormControl('', []),
    position: new FormControl('', []),
  });

  constructor(
    public salonService: SalonsService
  ) { }

  ngOnInit(): void {
    this.salonService.getAll().subscribe((salones: Salons[]) => {
      this.salons = salones;
    });

  }

  get f(){
    return this.form.controls;
  }

  create(){
    this.salonService.create(this.form.value).subscribe( salon => {
      this.salons.unshift(salon);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Salon creado',
        showConfirmButton: false,
        timer: 1500
      })
      this.form.reset();
    })
  }

  buttonEdit(id:number){
    this.f['name'].setValue(this.salons[id].name);
    this.f['aforo'].setValue(this.salons[id].aforo);
    this.f['id'].setValue(this.salons[id].id);
    this.f['position'].setValue(id);
  }

  edit(){
    
    this.salonService.edit(this.form.value).subscribe( salon => {
      let position = this.form.value.position;
      this.salons[position] = salon;
    })
  }

  delete(id:number){
    Swal.fire({
      title: '¿Esta seguro de eliminar el salon?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salonService.delete(id).subscribe(res => {
          this.salons = this.salons.filter(item => item.id !== id);
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
