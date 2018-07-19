import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../providers/provider.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;
  auth2: any;

  constructor(
        public router: Router,
        public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '16548362476-cdgfovs8a951ucsqqhv30re07g3u5mrj.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle( token )
                          // .subscribe( resp => this.router.navigate(['/dashboard']) ); // * No funcionan los estilos
                          .subscribe( resp => window.location.href = '#/dashboard' );

    });

  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.usuarioService.login( usuario, forma.value.recuerdame )
                        .subscribe( resp => this.router.navigate(['/dashboard']));

    console.log( forma.value );
  }

}
