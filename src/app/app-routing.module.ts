import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes  

import { HomeComponent } from './components/home/home.component';
import { SalonsComponent } from "./components/salons/index/salons.component";
import { CursosComponent } from './components/cursos/cursos.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { MembersComponent } from './components/members/members.component';
import { AddMembersComponent } from './components/add-members/add-members.component';
import { AuthGuard } from './Guard/auth.guard';
import { HistorialComponent } from './components/historial/historial.component';

const APP_ROUTES: Routes = [
  // Home
  { path: 'home', component: HomeComponent },
  
  // Salones
  { path: 'salones', component: SalonsComponent, canActivate:[ AuthGuard ] },
  
  // Cursos
  { path: 'cursos', component: CursosComponent, canActivate:[ AuthGuard ] },

  // Agenda
  { path: 'agenda', component: SchedulesComponent, canActivate:[ AuthGuard ] },

  // Miembros
  { path: 'members', component: MembersComponent, canActivate:[ AuthGuard ] },

  // Añadir curso
  { path: 'add-member', component: AddMembersComponent, canActivate:[ AuthGuard ] },

  // Historial
  { path: 'historial', component: HistorialComponent, canActivate:[ AuthGuard ] },

  // Redireccion si no encuentra la ruta
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot( APP_ROUTES );
