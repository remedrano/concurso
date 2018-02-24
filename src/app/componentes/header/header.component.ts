import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../servicios/sesion.service';
import { LoginService } from '../../servicios/login.service';
import {Router} from "@angular/router";

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

  public isLoggedIn : boolean;

  constructor(
    private sesionService: SesionService,
    private loginService: LoginService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.sesionService.sesionActivada().subscribe( value => { this.isLoggedIn = value} )
  }

  onLogout(){
    this.loginService.logout();
    window.location.reload()
  }
}
