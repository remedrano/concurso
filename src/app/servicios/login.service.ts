import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpParams, HttpHeaders , HttpHeaderResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { Usuario } from '../modelos/usuario';
import {SesionService} from "../servicios/sesion.service";
import {Voz} from "../modelos/voz";

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

    /*const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<Usuario>(this.urlServer+'/api/user/login', JSON.stringify(params),{ headers:headers } );*/
    return this.http.get<Usuario>('assets/baseDatos/usuarios.json');

  }

  crearCuenta( usuario : Usuario ) : Observable<any>{

    let param = new HttpParams(); //por tiempo s realizo asi , se debe cambiar
    param.append( "firstName", usuario.firstName);
    param.append( "secondName", usuario.secondName);
    param.append( "firstLastName", usuario.firstLastName);
    param.append( "secondLastName", usuario.secondLastName);
    param.append( "email", usuario.email);
    param.append( "rol", usuario.rol);
    param.append( "password", usuario.password);

    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<any>(this.urlServer+'/api/user', JSON.stringify(param), { headers: headers}  );
  }

  logout() {
    this.sesion.cerrarSesion();
  }

}
