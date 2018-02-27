import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,AbstractControl } from '@angular/forms';
import { LoginService  } from '../../servicios/login.service';
import { Router} from '@angular/router';
import { SesionService } from "../../servicios/sesion.service";
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

    this.sesionService.sesionActivada().subscribe( value => {
      if( value ) this.router.navigate(['inicio'])
    })
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

        if( data["code"] == 1 && data != null ) //Usuario consultado
          alert("Usuario no existe");
        else{
          let usuario = data;
          this.sesionService.iniciarSesion( usuario );
          window.location.reload()
        }

      }, err => {
        console.log(err);
      });

    }
    this.envioFormulario = true;
  }

}
