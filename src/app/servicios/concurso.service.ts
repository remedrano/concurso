import { Injectable } from '@angular/core';
import { Concurso } from "../modelos/concurso";
import { Usuario } from "../modelos/usuario";
import { Voz } from "../modelos/voz";
import { HttpClient, HttpParams,HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs/Observable";

@Injectable()
export class ConcursoService {

  private urlServer : string = 'http://192.168.0.7:9000';

  constructor( private http: HttpClient ) { }

  crearConcurso(concurso: Concurso, idUsuario:number, archivo : any ) : Observable<Concurso>{
    concurso.imagenConcurso = archivo;
    concurso.idUsuarioCreador = idUsuario;
    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<Concurso>(this.urlServer+'/api/concurso', JSON.stringify(concurso), { headers: headers}  );
  }

  obtenerConcurso(idConcurso : number) : Observable<Concurso>{
    return this.http.get<Concurso>(this.urlServer+'/api/concurso/'+idConcurso);
  }

  editarConcurso(concurso: Concurso, idUsuario:number, archivo : any, idConcurso:number ) : Observable<Concurso>{
    concurso.imagenConcurso = archivo;
    concurso.idUsuarioCreador = idUsuario;
    console.log(concurso)
    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.put<Concurso>(this.urlServer+'/api/concurso/'+idConcurso, JSON.stringify(concurso), { headers: headers}  );
  }

  catalogoConcurso(idUsuario : number ) : Observable<Concurso[]>{

    //http://localhost:8090/api/concurso/usuario/{idUsuarioCreador}
    return this.http.get<Concurso[]>(this.urlServer+'/api/concurso/usuario/'+idUsuario);
  }


  eliminarConcurso( concurso: Concurso ): Observable<any>{
    const id = concurso.id
    //const params = new HttpParams( ).set('idConcurso', concurso.id.toString());
    return this.http.delete(this.urlServer+ '/api/concurso/'+id);
  }

  catalogoVoces( idConcurso ) : Observable<Voz[]>{
    return this.http.get<Voz[]>(this.urlServer+'/api/voces/concurso/'+idConcurso);
  }

  subirVoz( voz : any , usuario : Usuario, archivo: File, idConcurso: string, fileName: string) : Observable<Voz>{

    voz.usuario = usuario;
    voz.base64file = archivo;
    //const headers = new HttpHeaders ( { 'Content-Type': 'multipart/form-data' } );
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


    //return this.http.request('POST', this.urlServer+'/api/voice', {body: voz, headers:headers});
    return this.http.post<Voz>(this.urlServer+'/api/voice', formData );
  }

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
