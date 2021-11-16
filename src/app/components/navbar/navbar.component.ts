import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Auth } from 'src/app/interface/auth';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Auth[] = [];
  menus: any = [];
  autentication: boolean = false;

  title: string = "";


  form: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ])
  })

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getUser$().subscribe( (user: any) => {
      this.user = [];
      this.user.push(user);
      if(this.user[0] != null){
        this.title = this.user[0].name;
        this.autentication = true;
        let rol = this.user[0].rol_id;
        if(rol == 1){
          this.menus = [
            {
              'url': '/salones',
              'name': 'Salones'
            },
            {
              'url': '/cursos',
              'name': 'Cursos'
            },
            {
              'url': '/historial',
              'name': 'Historial'
            }
          ];
        }else if(rol == 2){
          this.menus = [
            {
              'url': '/agenda',
              'name': 'Agenda'
            },
            {
              'url': '/historial',
              'name': 'Historial'
            }
          ]
        }else{
          this.menus = [
            {
              'url': '/historial',
              'name': 'Historial'
            }
          ]
        }
      }else{
        this.autentication = false;
        this.menus = [];
        this.title = "";
        this.user = [];
      }
    })
    if(localStorage.getItem('user_api') != null)
      this.authService.getUserLocal(JSON.parse(localStorage.getItem('user_api')!));
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  get f(){
    return this.form.controls;
  }

  login(){
    Swal.fire({
      icon: 'info',
      title: 'Enviando datos...',
      allowOutsideClick: false
    })
    Swal.showLoading();
    this.authService.login(this.form.value).subscribe(res => {
      if( !res['success'] ){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res['message']
        })
      }else{
        this.authService.guardarUser(res['access_token']).subscribe(res => {
          Swal.close();
          this.form.reset();
        })
      }
    })
  }

}
