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

  crearConcurso(concurso: Concurso, idUsuario:number, archivo : any ) : Observable<Concurso>{
    concurso.imagenConcurso = archivo;
    concurso.idUsuarioCreador = idUsuario;
    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<Concurso>(this.urlServer+'/api/concurso', JSON.stringify(concurso), { headers: headers}  );
  }

  editarConcurso() : Observable<Concurso>{
    return this.http.get<Concurso>('assets/baseDatos/concurso.json');
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

  subirVoz( voz : any , usuario : Usuario, archivo: File, idConcurso: number, fileName: string) : Observable<Voz>{

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
    formData.append('nameFile', voz.nameFile);
    formData.append('idcompetition', voz.idcompetition);


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
