import {Component, OnInit, ChangeDetectorRef, AfterViewInit, Inject} from '@angular/core';
import { ConcursoService } from "../../servicios/concurso.service";
import {  SesionService } from "../../servicios/sesion.service";

import {Router,ActivatedRoute} from "@angular/router";
import { Voz } from "../../modelos/voz";
import { Usuario } from "../../modelos/usuario";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Concurso } from '../../modelos/concurso';

@Component({
  selector: 'app-home-concurso',
  templateUrl: './home-concurso.component.html',
  styleUrls: ['./home-concurso.component.css'],
  providers: [
    ConcursoService,
    SesionService
  ]
})

export class HomeConcursoComponent implements OnInit {

  public voces : Voz[];
  public params : any;
  public concurso : Concurso;

  errorMessageFile: string;
  allowedMimeType = ['audio/wav','audio/mp3','audio/ogg'];
  maxFileSize = 10 * 1024 * 1024;

  form: FormGroup;
  private envioFormulario: boolean;
  private isLoggedIn : boolean;
  public valorUrl : string;
  public archivo : any;
  public nameFile : string;
  public extensionesPermitidas = [".mp3", ".wav", ".ogg", ".wma", ".midi" ,".cd"];

  constructor(
     private fb: FormBuilder,
     private concursoService : ConcursoService,
     private router : Router,
     private route: ActivatedRoute,
     private cd: ChangeDetectorRef ,
     public dialog: MatDialog,
     public sesionService : SesionService
  ) { }

  ngOnInit( ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      observacion: ['', Validators.required]
    });

    this.route.params.subscribe( params => this.params = (params) );
    this.concursoService.cargarConcurso( null , this.params["nombre"]).subscribe( data => {

      this.concurso = data;
      if( this.concurso != null ) {

        this.concursoService.catalogoVoces(data.id).subscribe(data => {
          this.voces = data;
        }, err => {
          console.log(err);
        });
      }

    }, err => {
      console.log(err);
    });

  }

  reproducirAudio( urlArchivo ): void {

    let dialogRef = this.dialog.open(DialogClass, {
      width: '400px',
      data: { urlArchivo: urlArchivo },

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  cargarArchivo( archivo : any ){
    if (archivo.files && archivo.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e: any) {
        this.concursoService.cargarArchivoVoz(archivo.files[0])
      }.bind(this);
      reader.readAsDataURL(archivo.files[0]);
    }
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

      this.concursoService.cargarConcurso( null , this.params["nombre"]).subscribe( data => {

        if( data != null){//Busco el id del concurso por el nombre
          this.concursoService.subirVoz(this.form.value , this.archivo , data.id, this.nameFile ).subscribe( data => {
            if( data["code"] == 0 && data != null ){ //Registro almacenado
              alert("Registro almacenada!");
            }
            else{
              alert("Error almacenando datos")
            }

          }, err => {
            console.log(err);
          });
        }
        }, err => {
          console.log(err);
        });

    }

    if( this.archivo == null ){
      alert("Debes seleccionar un archivo de audio");
    }
    this.envioFormulario = true;
  }

  onClicUrl( ){
    this.valorUrl = this.form.value.urlConcurso
  }

  onFileChangeHome(input:any) {
    this.archivo = null;
    if (input.files && input.files[0]) {
      //this.archivo = input.files[0];
      this.nameFile = input.files[0].name
      //Validar extensiones de audio
      let encontro = false
      for( var index in this.extensionesPermitidas){
        if( this.nameFile.toLowerCase().indexOf( this.extensionesPermitidas[index] ) != -1){
          encontro = true;
        }
      }
      if( encontro == false){
        alert("Archivo con extensión no permitida --> "+this.extensionesPermitidas.toString());
        return false;
      }

      let reader = new FileReader();
      reader.onload = function (e: any) {
        this.archivo = e.target.result;
      }.bind(this);

      reader.readAsDataURL(input.files[0]);
    }
  }
}

declare var jwplayer : any;

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.html'
})
export class DialogClass implements OnInit,AfterViewInit {

  constructor(public dialogRef: MatDialogRef<DialogClass>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){}

  ngAfterViewInit(){
   jwplayer("mediaplayer").setup({
      file: "/assets/audio/voz.mp3",
      height: 180,
      width: 350,
      autostart: true,
      controls: true
    }) ;
  }

}
