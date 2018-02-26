import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpParams, HttpHeaders , HttpHeaderResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { Usuario } from '../modelos/usuario';
import {SesionService} from "../servicios/sesion.service";

@Injectable()
export class LoginService {

  private urlServer : string = 'http://http://192.168.0.7:9000';

  constructor( private router: Router, private http: HttpClient, private sesion : SesionService ) {
  }

  login(usuario: Usuario) : Observable<Usuario>{

    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<any>(this.urlServer+'/api/user/login', JSON.stringify(usuario),{ headers:headers } );

  }

  crearCuenta( usuario : Usuario ) : Observable<any>{

    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<any>(this.urlServer+'/api/user', JSON.stringify(usuario), { headers: headers}  );
  }

  logout() {
    this.sesion.cerrarSesion();
  }

}
