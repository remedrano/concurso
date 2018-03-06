import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService  } from '../../../servicios/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import { SesionService } from "../../../servicios/sesion.service";
import { ConcursoService } from "../../../servicios/concurso.service";
import swal from 'sweetalert2';

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
  public archivo : any;
  public params : any;
  public extensionesPermitidas = [".jpg", ".png", ".jpeg", ".gif"];

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private sesionService : SesionService,
    private router: Router,
    private concurso: ConcursoService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
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
  }

  validarCampos(campo: string) {
    return (
      (!this.form.get(campo).valid && this.form.get(campo).touched) ||
      (this.form.get(campo).untouched && this.envioFormulario)
    );
  }

  enviarFormulario() {

    if (this.form.valid && this.archivo != null ) {
      this.route.params.subscribe( params => this.params = (params) );
      let usuario = this.sesionService.getDataSesion();

      this.concurso.crearConcurso(this.form.value , usuario.id ,this.archivo).subscribe( data => {
        if( data["code"] == 0 && data != null ) { //Usuario consultado
          swal(
            'Concurso almacenado!',
            '',
            'success'
          ).then((result) => {
            this.router.navigate(['/catalogoConcurso']);
          })
        }
        else{
          if( data["code"] == 1 && data != null ) {
            swal(
              'El concurso se encuentra registrado!',
              'intenta colocar otra url',
              'error'
            )
          }
          else{
            swal(
              'Error almacenando datos!',
              'Contacte con el administrador.',
              'error'
            )
          }

        }
      }, err => {
        console.log(err);
      });


    }
    if( this.archivo == null ){
      swal(
        'Selecciona una imagen!',
        '',
        'error'
      )
    }
    this.envioFormulario = true;
  }

  onClicUrl( ){
    this.valorUrl = this.form.value.urlConcurso
  }

  onFileChange(input:any){
    this.archivo = null;
    //var extn = filename.split(".").pop();
    if (input.files && input.files[0]) {
      //this.archivo = input.files[0];

      let nameFile = input.files[0].name;
      //Validar extensiones de audio
      let encontro = false
      for( var index in this.extensionesPermitidas){
        if( nameFile.toLowerCase().indexOf( this.extensionesPermitidas[index] ) != -1){
          encontro = true;
        }
      }
      if( encontro == false){

        swal(
          "Archivo con extensión no permitida --> "+this.extensionesPermitidas.toString(),
          'Seleccione un archivo permitido',
          'error'
        )
        return false;
      }

      let reader = new FileReader();
      reader.onload = function (e: any) {
        let archivoLocal = new Image();
        archivoLocal.src = e.target.result;
        archivoLocal.onload = function () {
          let canvas: any = document.getElementById("photoPreview"),
            context = canvas.getContext("2d");
          context.drawImage(archivoLocal,0,0,200,200);
        }.bind(this);

        this.archivo = e.target.result;

      }.bind(this);

      reader.readAsDataURL(input.files[0]);
    }
  }

}
