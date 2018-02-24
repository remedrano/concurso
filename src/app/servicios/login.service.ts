import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { Usuario } from '../modelos/usuario';
import {SesionService} from "../servicios/sesion.service";

@Injectable()
export class LoginService {

  constructor( private router: Router, private http: HttpClient, private sesion : SesionService ) {
  }

  login(usuario: Usuario) : Observable<Usuario>{

    let params =  new HttpParams();
    params.set( 'email', usuario.email );
    params.set( 'password', usuario.password );
    params.set( 'rol', usuario.rol );

    return this.http.get<Usuario>('assets/baseDatos/usuarios.json', {
      params: params
    });
  }

  crearCuenta( usuario : Usuario ) : Observable<any>{

    let params =  new HttpParams( );
    Object.keys(usuario).forEach(function (item) {
      params = params.set(item, usuario[item]);
    });

    let headers = new HttpHeaders();
    headers.append( 'Access-Control-Allow-Origin','*' );

    return this.http.post<any>('http://172.24.101.80:9000/api/user', {
      params: params
    },{ headers: headers } );

  }


  logout() {
    this.sesion.cerrarSesion();
  }

}
