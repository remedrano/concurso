import {ChangeDetectorRef, Component, OnInit, Input} from '@angular/core';
import { SesionService } from '../../servicios/sesion.service';
import { LoginService } from '../../servicios/login.service';
import {ActivatedRoute, Router} from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[
    SesionService,
    LoginService
  ]
})

export class HeaderComponent implements OnInit {

  @Input() urlConcurso: string;
  public params : any ;
  public isLoggedIn = false;
  public url : string;

  constructor(
    private sesionService: SesionService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    ) {
  }

  ngOnInit() {
    this.sesionService.sesionActivada().subscribe( value => { this.isLoggedIn = value} )
    this.route.url.subscribe( url => {
      if( url.length != 0 ) {
        this.url = url[0].path;
      }
      else
        this.router.navigate(["/login"]);
    });

    if( (this.url == 'login' || this.url == 'cuenta'   ) && this.isLoggedIn == true ) { // formularios sin inicio
      this.router.navigate(["/concurso"]);
    }
    else { // formmularios con inicio de sesion
      if ((this.url == 'crearConcurso' || this.url == 'catalogoConcurso' || this.url == 'inicio') && this.isLoggedIn == false)
        this.router.navigate(["/login"]);
    }

    if( this.urlConcurso == null || this.urlConcurso == ""){
      this.urlConcurso = this.sesionService.getUrlConcurso();
    }
  }

  onLogout(){
    this.loginService.logout();

    swal(
      'Gracias por utilizar nuestra plataforma!',
      'Vuelve pronto...',
      'success'
    ).then((result) => {
        this.router.navigate(["/concurso/"+this.urlConcurso]);
    });
  }
}
