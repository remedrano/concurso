import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService  } from '../../../servicios/login.service';
import { Router} from '@angular/router';
import {SesionService} from "../../../servicios/sesion.service";
import {ConcursoService} from '../../../servicios/concurso.service';
import { Concurso } from "../../../modelos/concurso";


@Component({
  selector: 'app-editar-concurso',
  templateUrl: './editar-concurso.component.html',
  styleUrls: ['./editar-concurso.component.css'],
  providers: [
    LoginService,
    SesionService,
    ConcursoService
  ]
})
export class EditarConcursoComponent implements OnInit {

  form: FormGroup;
  private envioFormulario: boolean;
  private isLoggedIn : boolean;
  public valorUrl : string;
  public concurso : Concurso;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private sesionService : SesionService,
    private concursoService : ConcursoService,
    private router: Router
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      nombreConcurso: ['', Validators.required],
      imagenConcurso: ['', Validators.required],
      urlConcurso: ['', Validators.required],
      fechaInicioConcurso: ['', Validators.required],
      fechaFinConcurso: ['', Validators.required],
      valorPagar: ['', Validators.required],
      guion: ['', Validators.required],
      recomendacion: ['', Validators.required]
    });

    this.sesionService.sesionActivada().subscribe( value => {
      if( value ) this.router.navigate(['inicio'])
    })

    this.concursoService.editarConcurso().subscribe( data => {
      this.concurso = data;
      this.form = this.fb.group({
        nombreConcurso: [this.concurso.nombreConcurso, Validators.required],
        imagenConcurso: [this.concurso.imagenConcurso, Validators.required],
        urlConcurso: [this.concurso.urlConcurso, Validators.required],
        fechaInicioConcurso: [this.concurso.fechaInicioConcurso, Validators.required],
        fechaFinConcurso: [this.concurso.fechaFinConcurso, Validators.required],
        valorPagar: [this.concurso.valorPagar, Validators.required],
        guion: [this.concurso.guion, Validators.required],
        recomendacion: [this.concurso.recomendacion, Validators.required]
      });
    }, err => {
      console.log(err);
    });
  }

  validarCampos(campo: string) {
    return (
      (!this.form.get(campo).valid && this.form.get(campo).touched) ||
      (this.form.get(campo).untouched && this.envioFormulario)
    );
  }

  enviarFormulario() {

    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe( data => {

        if( data["code"] == 0 && data != null ) //Usuario consultado
          alert("Concurso almacenado!");
        else{
          alert("Error almacenando concurso")
        }

      }, err => {
        console.log(err);
      });

    }
    this.envioFormulario = true;
  }

  onClicUrl( ){
    this.valorUrl = this.form.value.urlConcurso
  }

}
