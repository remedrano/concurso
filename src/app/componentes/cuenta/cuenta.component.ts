import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,AbstractControl } from '@angular/forms';
import { LoginService  } from '../../servicios/login.service';
import { Router} from '@angular/router';
import { SesionService } from "../../servicios/sesion.service";
import swal from 'sweetalert2';

import {Usuario} from '../../modelos/usuario';

function passwordConfirming(c: AbstractControl): any {
  if(!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd= c.parent.get('confirmpass')

  if(!pwd || !cpwd) return ;
  if (pwd.value !== cpwd.value) {
    return { invalid: true };
  }
}

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],
  providers: [
    LoginService,
    SesionService
  ]
})

export class CuentaComponent implements OnInit {

  form: FormGroup;
  private envioFormulario: boolean;
  private isLoggedIn : boolean;
  public roles : any = [
    { "nombre" : "Administrador", "value" : "administrador"},
    { "nombre" : "Normal", "value" : "normal"}
    ]

  crearCuenta: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private sesionService : SesionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      //email: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      confirmpass: ['', [Validators.required, passwordConfirming]],
    } );
  }

  validarCampos(campo: string) {
    return (
      (!this.form.get(campo).valid && this.form.get(campo).touched) ||
      (this.form.get(campo).untouched && this.envioFormulario)
    );
  }

  enviarFormulario() {

    if (this.form.valid) {

      this.loginService.crearCuenta(this.form.value).subscribe( data => {

        if( data["code"] == 1 && data != null ) { //Usuario consultado
          swal(
            'El usuario ya existe!',
            'Por favor digite otro correo',
            'error'
          )
        }
        else{

          let datosUsuario  : Usuario = {
            firstName: '',
            secondName: '',
            firstLastName: '',
            secondLastName: '',
            email: this.form.value.email,
            password: this.form.value.password,
            rol: '',
            id: ''
          };

          this.loginService.login( datosUsuario ).subscribe(
            data => {
              let usuario = data;

              this.sesionService.iniciarSesion( usuario );
              swal(
                'Usuario registrado!',
                'Será redireccionado al inicio de la plataforma',
                'success'
              ).then((result) => {
                if (result.value) {
                  this.router.navigate(['/inicio'])
                }
              })

            }
          );


        }

      }, err => {
        console.log(err);
      });

    }
    this.envioFormulario = true;
  }

}
