import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpParams, HttpHeaders , HttpHeaderResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { Usuario } from '../modelos/usuario';
import {SesionService} from "../servicios/sesion.service";
import {Voz} from "../modelos/voz";

@Injectable()
export class LoginService {

  private urlServer : string = 'http://localhost:9000';

  constructor( private router: Router, private http: HttpClient, private sesion : SesionService ) {
  }

  login(usuario: Usuario) : Observable<Usuario>{
    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<Usuario>(this.urlServer+'/api/user/login', JSON.stringify(usuario),{ headers:headers } );
  }

  crearCuenta( usuario : Usuario ) : Observable<any>{

    let usuarioParam = {
      firstName : usuario.firstName,
      secondName : usuario.secondName,
      firstLastName : usuario.firstLastName,
      secondLastName : usuario.secondLastName,
      email : usuario.email,
      rol : usuario.rol,
      password : usuario.password
  }

    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<any>(this.urlServer+'/api/user', JSON.stringify(usuarioParam), { headers: headers}  );
  }

  logout() {
    this.sesion.cerrarSesion();
  }

}
