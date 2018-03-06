import { Injectable } from '@angular/core';
import { Concurso } from "../modelos/concurso";
import { Usuario } from "../modelos/usuario";
import { Voz } from "../modelos/voz";
import { HttpClient, HttpParams,HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs/Observable";


@Injectable()
export class ConcursoService {

  private urlServer : string = 'http://localhost:9000';

  constructor( private http: HttpClient ) { }

  crearConcurso(concurso: Concurso, idUsuario:string, archivo : any ) : Observable<any>{
    concurso.imagenConcurso = archivo;
    concurso.idUsuarioCreador = idUsuario;
    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<Concurso>(this.urlServer+'/api/concurso', JSON.stringify(concurso), { headers: headers}  );
  }

  catalogoConcurso(idUsuario : string ) : Observable<Concurso[]>{
    return this.http.get<Concurso[]>(this.urlServer+'/api/concurso/usuario/'+idUsuario);
  }

  editarConcurso(concurso: Concurso, idUsuario: string, archivo : any, idConcurso:string ) : Observable<Concurso>{
    concurso.imagenConcurso = archivo;
    concurso.idUsuarioCreador = idUsuario;
    console.log(concurso)
    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.put<Concurso>(this.urlServer+'/api/concurso/'+idConcurso, JSON.stringify(concurso), { headers: headers}  );
  }

  obtenerConcurso(idConcurso : string) : Observable<Concurso>{
    return this.http.get<Concurso>(this.urlServer+'/api/concurso/'+idConcurso);
  }

  eliminarConcurso( concurso: Concurso ): Observable<any>{

    return this.http.delete(this.urlServer+ '/api/concurso/'+ concurso.id);
  }

  catalogoVoces( idConcurso ) : Observable<Voz[]>{
    return this.http.get<Voz[]>(this.urlServer+ '/api/voces/concurso/'+idConcurso);
  }

  subirVoz( voz : any , archivo: any, idConcurso : string, nameFile : string) : Observable<Voz>{

    const formData: FormData = new FormData();
    formData.append('base64file', archivo);
    formData.append('firstName', voz.firstName);
    formData.append('secondName', voz.secondName);
    formData.append('firstLastName', voz.firstLastName);
    formData.append('secondLastName', voz.secondLastName);
    formData.append('email', voz.email);
    formData.append('observation', voz.observation);
    formData.append('nameFile', archivo.name);
    formData.append('idcompetition', idConcurso);

    return this.http.post<Voz>(this.urlServer+'/api/voice', formData );
  }

  cargarConcurso( idConcurso : string, urlConcurso : string ) : Observable<Concurso>{

    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );

    if( idConcurso != null  && idConcurso != undefined && idConcurso.toString() != "undefined" ){
      return this.http.get<Concurso>(this.urlServer+'/api/concurso/'+idConcurso);
    }else{
      if( urlConcurso != null && urlConcurso != undefined && urlConcurso != "undefined"){
        return this.http.get<Concurso>(this.urlServer+'/api/url/'+urlConcurso);
      }
    }
  }


}
