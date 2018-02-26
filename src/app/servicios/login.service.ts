import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpParams, HttpHeaders , HttpHeaderResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { Usuario } from '../modelos/usuario';
import {SesionService} from "../servicios/sesion.service";

@Injectable()
export class LoginService {

  private urlServer : string = 'http://172.24.101.80:9000';

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

    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<any>(this.urlServer+'/api/user', JSON.stringify(usuario), { headers: headers}  );
  }

  logout() {
    this.sesion.cerrarSesion();
  }

}
