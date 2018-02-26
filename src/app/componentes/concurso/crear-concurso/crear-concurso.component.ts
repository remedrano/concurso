import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService  } from '../../../servicios/login.service';
import { Router} from '@angular/router';
import { SesionService } from "../../../servicios/sesion.service";
import { ConcursoService } from "../../../servicios/concurso.service";

@Component({
  selector: 'app-crear-concurso',
  templateUrl: './crear-concurso.component.html',
  styleUrls: ['./crear-concurso.component.css'],
  providers: [
    LoginService,
    SesionService,
    ConcursoService
  ]
})
export class CrearConcursoComponent implements OnInit {

  form: FormGroup;
  private envioFormulario: boolean;
  private isLoggedIn : boolean;
  public valorUrl : string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private sesionService : SesionService,
    private router: Router,
    private concurso: ConcursoService,


  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      nombreConcurso: ['', Validators.required],
      urlConcurso: ['', Validators.required],
      fechaInicioConcurso: ['', Validators.required],
      fechaFinConcurso: ['', Validators.required],
      valorPagar: ['', Validators.required],
      guion: ['', Validators.required],
      recomendacion: ['', Validators.required]
    });

    /*this.sesionService.sesionActivada().subscribe( value => {
      if( value ) this.router.navigate(['inicio'])
    })*/
  }

  validarCampos(campo: string) {
    return (
      (!this.form.get(campo).valid && this.form.get(campo).touched) ||
      (this.form.get(campo).untouched && this.envioFormulario)
    );
  }

  enviarFormulario() {
    if (this.form.valid) {
      this.concurso.crearConcurso(this.form.value).subscribe( data => {

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
