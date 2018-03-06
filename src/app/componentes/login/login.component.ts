import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService  } from '../../servicios/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SesionService} from "../../servicios/sesion.service";
import swal from 'sweetalert2'

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
        {
          swal(
            'El usuario no existe!',
            'Por favor digite otro correo y otra clave e intente de nuevo',
            'error'
          )
        }
        else{
          let usuario = data;
          this.sesionService.iniciarSesion( usuario );
          this.router.navigate(['/inicio'])
        }

      }, err => {
        console.log(err);
      });

    }
    this.envioFormulario = true;
  }
}
