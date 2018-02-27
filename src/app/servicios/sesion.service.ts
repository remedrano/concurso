import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../modelos/usuario';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SesionService {

  private sesion: BehaviorSubject< boolean >;

  constructor( private router: Router,
               private localStorageService: LocalStorageService) {

    this.sesion = new  BehaviorSubject( false );
  }

  sesionActivada() : Observable<any> {
    //let sesion = false;
    let usuarioLocal = this.localStorageService.get("usuario");
    if( usuarioLocal != null && Object.keys(usuarioLocal).length > 0 )
      //sesion = true;
      this.sesion.next( true );
    return this.sesion.asObservable();
  }

  cerrarSesion(){
    this.localStorageService.remove('usuario');
    this.sesion.next( false );
  }

  getDataSesion() : Usuario{
    let usuarioLocal = <Usuario>this.localStorageService.get("usuario");
    return usuarioLocal;
  }

  setUrlConcurso( urlConcurso ){
    this.localStorageService.add('urlconcurso', urlConcurso);
  }

  getUrlConcurso() {
    return <string>this.localStorageService.get("urlconcurso");
  }

  iniciarSesion(usuario : Usuario){

    let usuarioLocal = this.localStorageService.get("usuario");
    if( usuarioLocal == null )
      this.localStorageService.add('usuario', usuario);
    else{
      if( usuarioLocal["email"] != usuario["email"] ){
        this.localStorageService.remove('usuario');
        this.localStorageService.add('usuario',usuario);
      }else{
        console.log("El usuario ya inició sesión")
      }
    }
  }
}
