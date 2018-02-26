import {Component, OnInit, ChangeDetectorRef, AfterViewInit, Inject} from '@angular/core';
import { ConcursoService } from "../../servicios/concurso.service";
import {  SesionService } from "../../servicios/sesion.service";


import {Router,ActivatedRoute} from "@angular/router";
import { Voz } from "../../modelos/voz";
import { Usuario } from "../../modelos/usuario";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FileUploader , FileLikeObject} from 'ng2-file-upload';
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
  public archivo : File;

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
      observation: ['', Validators.required],
      nameFile: ['cualquiercosa.mp3', Validators.required],
      idcompetition: ['6ff58e89-98a6-4285-837f-1a8e1957d352', Validators.required],
      base64file: ['6ff58e89-98a6-4285-837f-1a8e1957d352', Validators.required],
    });

    let param = this.route.params.subscribe( params => this.params = (params) );
    this.concursoService.cargarConcurso( null , param["nombre"]).subscribe( data => {

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

  onFileChangeRafa(input:any) {
    console.log("claro que si llega")
    //var extn = filename.split(".").pop();
    if (input.files && input.files[0]) {
      //this.archivo = input.files[0];
      let reader = new FileReader();
      reader.onload = function (e: any) {
        this.archivo = input.files[0];
      }.bind(this);

      reader.readAsDataURL(input.files[0]);
    }
  }

  enviarFormulario() {

    if (this.form.valid && this.archivo != null ) {
      let usuario = this.sesionService.getDataSesion();

      let param = this.route.params.subscribe( params => this.params = (params) );

      this.concursoService.cargarConcurso( '6ff58e89-98a6-4285-837f-1a8e1957d352' , param["nombre"]).subscribe( data => {

        if( data != null){//Busco el id del concurso por el nombre
          this.concursoService.subirVoz(this.form.value, usuario , this.archivo , data.id).subscribe( data => {
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
      alert("Debes enviar un archivo de audio");
    }
    this.envioFormulario = true;
  }

  onClicUrl( ){
    this.valorUrl = this.form.value.urlConcurso
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
