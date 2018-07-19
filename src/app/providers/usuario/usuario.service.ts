import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS_DEV } from '../../config/config';

// * Sweetalert 2
import swal from 'sweetalert2';

import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    console.log('Servicio de usuario listo!');
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( id: string , token: string, usuario: Usuario ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logout() {

    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  loginGoogle( token: string ) {

    const url = URL_SERVICIOS_DEV + '/login/google';

    return this.http.post(url, { token })
                    .map( (resp: any) => {

                      this.guardarStorage(resp.id, resp.token, resp.usuario);

                      return true;

                    });

  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS_DEV + '/login';

    return this.http.post( url, usuario )
                    .map( (resp: any) => {

                      this.guardarStorage(resp.id, resp.token, resp.usuario);

                      return true;

                    });

  }

  crearUsuario( usuario: Usuario ) {

    const url = `${URL_SERVICIOS_DEV}/usuario`;

    return this.http.post( url, usuario )
                .map( (resp: any) => {

                  swal({
                    title: 'Nuevo usuario creado!',
                    text: `Se ha creado el usuario ${ usuario.nombre } con el mail: ${ usuario.email }`,
                    type: 'success',
                    confirmButtonText: 'Ok'
                  });

                  return resp.usuario;
                });

  }


}
