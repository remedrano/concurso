import { Injectable } from '@angular/core';
import { Concurso } from "../modelos/concurso";
import { Voz } from "../modelos/voz";
import { HttpClient, HttpParams,HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs/Observable";


@Injectable()
export class ConcursoService {

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
    return this.http.get<Voz[]>('assets/baseDatos/audios.json');
  }

}
