import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { APP_BASE_HREF } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modulos/material/material.module'
import { DataTablesModule } from 'angular-datatables';
import { AsyncLocalStorageModule  } from 'angular-async-local-storage';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ImageUploadModule } from "angular2-image-upload";
import { UploadModule } from './modulos/upload/upload.module';
import { AppComponent } from './app.component';

//import { SesionService } from './servicios/sesion.service'
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { HeaderComponent } from './componentes/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';
import { CrearConcursoComponent } from './componentes/concurso/crear-concurso/crear-concurso.component';
import { CatalogoConcursoComponent } from './componentes/concurso/catalogo-concurso/catalogo-concurso.component';
import { DialogClass, HomeConcursoComponent} from './componentes/home-concurso/home-concurso.component';
import {EditarConcursoComponent} from "./componentes/concurso/editar-concurso/editar-concurso.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    HeaderComponent,
    CuentaComponent,
    CrearConcursoComponent,
    CatalogoConcursoComponent,
    HomeConcursoComponent,
    EditarConcursoComponent,
    DialogClass
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ImageUploadModule.forRoot(),
    AsyncLocalStorageModule,
    UploadModule,
    LocalStorageModule.withConfig({
      prefix: 'concurso',
      storageType: 'localStorage'
    }),
    RouterModule.forRoot([
        {
          path: '',
          component: InicioComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'concurso/:nombre',
          component: HomeConcursoComponent
        },
        {
          path: 'inicio',
          component: InicioComponent
        },
        {
          path: 'crearConcurso',
          component: CrearConcursoComponent
        },
        {
          path: 'catalogoConcurso',
          component: CatalogoConcursoComponent
        },
        {
          path: 'catalogoConcurso/detalleConcurso/:id/:tipo',
          component: HomeConcursoComponent
        },
        {
          path: 'login/cuenta',
          component: CuentaComponent
        },
        {
          path: 'catalogoConcurso/editarConcurso/:id',
          component:EditarConcursoComponent
        }
      ]
    )
  ],
  entryComponents: [DialogClass],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
