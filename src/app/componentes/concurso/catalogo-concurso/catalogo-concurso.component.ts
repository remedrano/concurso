import { Component, OnInit } from '@angular/core';
import { ConcursoService } from '../../../servicios/concurso.service'
import {  SesionService } from '../../../servicios/sesion.service'
import { Concurso } from "../../../modelos/concurso";
import { Router } from "@angular/router";

@Component({
  selector: 'app-catalogo-concurso',
  templateUrl: './catalogo-concurso.component.html',
  styleUrls: ['./catalogo-concurso.component.css'],
  providers: [
    ConcursoService,
    SesionService
  ]
})
export class CatalogoConcursoComponent implements OnInit {

  public concursos : Concurso[];
  public urlConcurso: string;

  constructor( private concursoService : ConcursoService,
               private sesionService : SesionService,
               private router : Router) { }

  ngOnInit() {
    this.sesionService
    let usuario = this.sesionService.getDataSesion();
    this.concursoService.catalogoConcurso( 1).subscribe( data => {
      this.concursos = data;
      jQuery(document).ready(function () {
        jQuery("#tabla-catalogo").DataTable({
          language: {url : "assets/datatable/spanish.json"} ,
          order: [[ 5, "desc" ]],
          lengthMenu: [[50], [50, "All"]]
        });
      })
    }, err => {
      console.log(err);
    });
  }

  eliminar( concurso : Concurso ){

    if( confirm("Realmente desea eliminar el concurso actual?, si existen voces o canciones registradas serán eliminadas")){
      this.concursoService.eliminarConcurso( concurso ).subscribe( data => {
        if( data != null ){
          if( data["code"] == 0 ){
            alert("Concurso eliminado")
          }
          else{
            alert("Problemas eliminando concurso!")
          }
        }
      }, err => {
        console.log(err);
      });

    }
  }

  redireccionarConcurso( url ){
    this.urlConcurso = url;
    let urlCompleta = "/detalleConcurso/"+url+"/admin";
    this.router.navigate([urlCompleta])
  }

}
