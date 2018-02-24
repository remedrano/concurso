import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService  } from '../../servicios/login.service';
import { Router} from '@angular/router';
import {SesionService} from "../../servicios/sesion.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    LoginService,
    SesionService
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private envioFormulario: boolean;
  private isLoggedIn : boolean;

  crearCuenta: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private sesionService : SesionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

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
      this.loginService.login(this.form.value).subscribe( data => {

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
