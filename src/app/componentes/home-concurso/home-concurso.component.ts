import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import {ConcursoService} from "../../servicios/concurso.service";
import {Router} from "@angular/router";
import { Voz } from "../../modelos/voz";

import "jwplayer";

declare var jwPlayer: any;

@Component({
  selector: 'app-home-concurso',
  templateUrl: './home-concurso.component.html',
  styleUrls: ['./home-concurso.component.css'],
  providers: [
    ConcursoService

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeConcursoComponent implements OnInit {

  public voces : Voz[];
  constructor( private concursoService : ConcursoService,
               private router : Router

               ) { }

  ngOnInit( ) {
    this.concursoService.catalogoVoces().subscribe( data => {
      this.voces = data;
    }, err => {
      console.log(err);
    });


    /*jQuery("#jwplayer")();
      jQuery("#jwplayer").on("click", function() {
      });*/

  }


  reproducirAudio( archivoPath ){


  }





}
