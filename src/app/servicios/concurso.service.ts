import { Injectable } from '@angular/core';
import { Concurso } from "../modelos/concurso";
import { Voz } from "../modelos/voz";
import { HttpClient, HttpParams,HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs/Observable";

@Injectable()
export class ConcursoService {

  private urlServer : string = 'http://172.24.101.80:9000';

  constructor( private http: HttpClient ) { }

  crearConcurso(concurso: Concurso) : Observable<Concurso>{

    return this.http.post<Concurso>('assets/baseDatos/usuarios.json', {
      params: concurso
    });
  }

  catalogoConcurso() : Observable<Concurso[]>{
    return this.http.get<Concurso[]>('assets/baseDatos/datos.json');
  }

  eliminarConcurso( concurso: Concurso ): Observable<any>{
    const params = new HttpParams( ).set('idConcurso', String(concurso.id));
    return this.http.get('assets/baseDatos/eliminar.json',{params });
  }

  catalogoVoces() : Observable<Voz[]>{
    return this.http.get<Voz[]>(this.urlServer+'/api/');
  }

  subirVoz( voz : Voz) : Observable<Voz>{
    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin':'*'} );
    return this.http.post<any>(this.urlServer+'/api/voice', JSON.stringify(voz),{ headers:headers } );
  }

  cargarArchivoVoz( archivo : any) : Observable<Voz>{
    return this.http.post<Voz>('assets/baseDatos/usuarios.json', {
      params: archivo
    });
  }
}
