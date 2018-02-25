import {Component, OnInit, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { ConcursoService } from "../../servicios/concurso.service";
import {Router,ActivatedRoute} from "@angular/router";
import { Voz } from "../../modelos/voz";
import { Usuario } from "../../modelos/usuario";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FileUploader , FileLikeObject} from 'ng2-file-upload';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-home-concurso',
  templateUrl: './home-concurso.component.html',
  styleUrls: ['./home-concurso.component.css'],
  providers: [
    ConcursoService
  ]
})

export class HomeConcursoComponent implements OnInit {

  public uploader:FileUploader
  public voces : Voz[];
  public params : any;

  errorMessageFile: string;
  allowedMimeType = ['audio/wav','audio/mp3','audio/ogg'];
  maxFileSize = 10 * 1024 * 1024;

  form: FormGroup;
  private envioFormulario: boolean;
  private isLoggedIn : boolean;
  public valorUrl : string;

  constructor(
     private fb: FormBuilder,
     private concursoService : ConcursoService,
     private router : Router,
     private route: ActivatedRoute,
     private cd: ChangeDetectorRef ,
     public dialog: MatDialog) { }

  ngOnInit( ) {

    this.uploader = new FileUploader({
      url: "http://localhost:4200/assets/",
      allowedMimeType: this.allowedMimeType,
      headers: [{name:'Accept', value:'application/json'}],
      autoUpload: false,
      maxFileSize: this.maxFileSize,
    });
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      observacion: ['', Validators.required]
    });

    this.route.params.subscribe( params => this.params = (params) );

    this.concursoService.catalogoVoces().subscribe( data => {
      this.voces = data;
    }, err => {
      console.log(err);
    });

  }


  reproducirAudio( urlArchivo ): void {

    let dialogRef = this.dialog.open(DialogClass, {
      width: '400px',
      data: { urlArchivo: urlArchivo }
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

    if (this.form.valid) {
      this.concursoService.subirVoz(this.form.value).subscribe( data => {

        if( data["code"] == 0 && data != null ){ //Registro almacenado
          this.uploader.uploadAll(); //Almacenar archivo
          alert("Registro almacenada!");
        }
        else{
          alert("Error almacenando datos")
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


  //Validación de subida de archivo

  onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any) {
    switch (filter.name) {
      case 'fileSize':
        this.errorMessageFile = `Máxima tamaño de archivo excedido (${item.size} de ${this.maxFileSize} permitido )`;
        alert( this.errorMessageFile  );
        console.log( this.errorMessageFile );
        break;
      case 'mimeType':
        const allowedTypes = this.allowedMimeType.join();
        this.errorMessageFile = `Tipo "${item.type} no es soportado. Solo se aceptan extensiones de del tipo : "${allowedTypes}"`;
        alert( this.errorMessageFile  );
        console.log( this.errorMessageFile );
        break;
      default:
        this.errorMessageFile = `Error desconocido (filtro es ${filter.name})`;
        alert( this.errorMessageFile  );
        console.log( this.errorMessageFile );
    }
  }
}
declare var jwplayer : any;

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.html'
})
export class DialogClass implements OnInit,AfterViewInit {

  constructor(public dialogRef: MatDialogRef<DialogClass>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){}

  ngAfterViewInit(){
   jwplayer("mediaplayer").setup({
      file: "http://172.12.25.25:9000/assets/audio/voz.mp3",
      height: 180,
      width: 350,
      autostart: true,
      controls: true
    }) ;
  }

}
