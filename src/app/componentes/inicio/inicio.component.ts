import { Component, OnInit } from '@angular/core';
import { SesionService } from "../../servicios/sesion.service";
import { Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [
    SesionService
  ]

})
export class InicioComponent implements OnInit {

  constructor(private sesionService: SesionService) { }

  ngOnInit() {

  }

}
