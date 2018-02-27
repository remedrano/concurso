import { Injectable } from '@angular/core';
import { Concurso } from "../modelos/concurso";
import { Usuario } from "../modelos/usuario";
import { Voz } from "../modelos/voz";
import { HttpClient, HttpParams,HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs/Observable";

@Injectable()
export class ConcursoService {

  private urlServer : string = 'http://172.24.101.80:9000';

  constructor( private http: HttpClient ) { }

  crearConcurso(concurso: Concurso, idUsuario:number, archivo : any ) : Observable<Concurso>{
    concurso.imagenConcurso = archivo;
    concurso.idUsuarioCreador
    const headers = new HttpHeaders ( { 'Content-Type': 'multipart/form-data' } );
    return this.http.post<Concurso>(this.urlServer+'/api/concurso', JSON.stringify(concurso), { headers: headers}  );
  }

  catalogoConcurso(idUsuario : number ) : Observable<Concurso[]>{

    //http://localhost:8090/api/concurso/usuario/{idUsuarioCreador}
    return this.http.get<Concurso[]>(this.urlServer+'/api/concurso/usuario/'+idUsuario);
  }

  eliminarConcurso( concurso: Concurso ): Observable<any>{
    const params = new HttpParams( ).set('idConcurso', concurso.id.toString());
    return this.http.delete(this.urlServer+ '/api/concurso/' ,{ params: params});
  }

  catalogoVoces( idConcurso ) : Observable<Voz[]>{
    return this.http.get<Voz[]>(this.urlServer+'/api/voces/concurso/'+idConcurso);
  }

  subirVoz( datos : any , archivo: any, idConcurso :number, nameFile : string) : Observable<Voz>{

    let param = new HttpParams();
    param.append("base64file",archivo );
    param.append("nameFile",nameFile);
    param.append("firstName",datos.firstName);
    param.append("secondName",datos.secondName);
    param.append("firstLastName",datos.firstLastName);
    param.append("secondLastName",datos.secondName);
    param.append("email",datos.email);
    param.append("observation",datos.observacion);
    param.append("idcompetition",idConcurso.toString());

    const headers = new HttpHeaders ( { 'Content-Type': 'multipart/form-data' } );
    return this.http.post<Voz>(this.urlServer+'/api/voice', JSON.stringify(param),{ headers:headers } );
  }

  //No se usa
  cargarArchivoVoz( archivo : any) : Observable<Voz>{
    return this.http.post<Voz>('assets/baseDatos/usuarios.json', {
      params: archivo
    });
  }

  cargarConcurso( idConcurso : number, urlConcurso : string ) : Observable<Concurso>{

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
