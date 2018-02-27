import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService  } from '../../../servicios/login.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  public archivo : any;
  public params : any;

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
      recomendacion: ['', Validators.required],
      userId: ['24a39808-c754-4de0-94c5-d00113b3d85d', Validators.required]
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

    if (this.form.valid && this.archivo != null ) {
      this.route.params.subscribe( params => this.params = (params) );
      let usuario = this.sesionService.getDataSesion();

      this.concurso.crearConcurso(this.form.value , usuario.id ,this.archivo).subscribe( data => {
        if( data["code"] == 0 && data != null ) //Usuario consultado
          alert("Concurso almacenado!");
        else{
          alert("Error almacenando concurso")
        }
      }, err => {
        console.log(err);
      });


    }
    if( this.archivo == null ){
      alert("Selecciona una imagen");
    }
    this.envioFormulario = true;
  }

  onClicUrl( ){
    this.valorUrl = this.form.value.urlConcurso
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


}
