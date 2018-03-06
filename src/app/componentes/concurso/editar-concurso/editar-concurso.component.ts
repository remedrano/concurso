import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService  } from '../../../servicios/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SesionService} from "../../../servicios/sesion.service";
import {ConcursoService} from '../../../servicios/concurso.service';
import { Concurso } from "../../../modelos/concurso";
import swal from 'sweetalert2';

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

  public form: FormGroup;
  private envioFormulario: boolean;
  private isLoggedIn : boolean;
  public valorUrl : string;
  public params : any;
  public concurso : Concurso;
  public archivo : any;


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private sesionService : SesionService,
    private concursoService : ConcursoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => this.params = (params) );

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

    this.concursoService.obtenerConcurso(this.params["id"]).subscribe( data => {
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

    if (this.form.valid && this.archivo != null ) {
      this.route.params.subscribe( params => this.params = (params) );
      let usuario = this.sesionService.getDataSesion();
      console.log("antes de enviar" + this.form.value)

      this.concursoService.editarConcurso(this.form.value , usuario.id ,this.archivo, this.params["id"]).subscribe( data => {
        if( data["code"] == 0 && data != null ) {
          swal(
            "Concurso modificado!",
            '',
            'success'
          ).then((result) => {
            this.router.navigate(['catalogoConcurso'])
          })
        }//Usuario consultado
        else{
          swal(
            "Error almacenando concurso!",
            '',
            'error'
          )
        }
      }, err => {
        console.log(err);
      });


    }
    if( this.archivo == null ){
      swal(
        "Selecciona una imagen!",
        '',
        'error'
      )
    }
    this.envioFormulario = true;
  }

  onFileChange(input:any){
    //var extn = filename.split(".").pop();
    if (input.files && input.files[0]) {
      //this.archivo = input.files[0];
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

  onClicUrl( ){
    this.valorUrl = this.form.value.urlConcurso
  }
}
