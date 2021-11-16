import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalonsComponent } from './components/salons/index/salons.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { MembersComponent } from './components/members/members.component';
import { AuthComponent } from './components/auth/auth.component';
import { AddMembersComponent } from './components/add-members/add-members.component';
import { HistorialComponent } from './components/historial/historial.component';

@NgModule({
  declarations: [
    AppComponent,
    SalonsComponent,
    NavbarComponent,
    HomeComponent,
    CursosComponent,
    SchedulesComponent,
    MembersComponent,
    AuthComponent,
    AddMembersComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
