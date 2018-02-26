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

  crearConcurso(concurso: Concurso, archivo : any ) : Observable<Concurso>{
    concurso.imagenConcurso = archivo;
    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.post<Concurso>(this.urlServer+'/api/concurso', JSON.stringify(concurso), { headers: headers}  );
  }

  editarConcurso() : Observable<Concurso>{
    return this.http.get<Concurso>('assets/baseDatos/concurso.json');
  }

  catalogoConcurso() : Observable<Concurso[]>{
    return this.http.get<Concurso[]>('assets/baseDatos/datos.json');
  }

  eliminarConcurso( concurso: Concurso ): Observable<any>{
    const params = new HttpParams( ).set('idConcurso', String(concurso.id));
    return this.http.get('assets/baseDatos/eliminar.json',{params });
  }

  catalogoVoces( idConcurso ) : Observable<Voz[]>{
    return this.http.get<Voz[]>(this.urlServer+'/api/voces/concurso/'+idConcurso);
  }

  subirVoz( voz : any , usuario : Usuario, archivo: File, idConcurso :number) : Observable<Voz>{

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

  cargarConcurso( idConcurso : string, urlConcurso : string ) : Observable<Concurso>{

    let params = new HttpParams();
    //if( idConcurso != null ) params.append("idConcurso" , idConcurso.toString()  );
    //if( urlConcurso != null ) params.append("nombreConcurso" , urlConcurso );

    const headers = new HttpHeaders ( { 'Content-Type': 'application/json' } );
    return this.http.get<Concurso>(this.urlServer+'/api/concurso/6ff58e89-98a6-4285-837f-1a8e1957d352');
  }
}
