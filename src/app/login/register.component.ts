import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// * Sweetalert 2
import swal from 'sweetalert2';

// * Services
import { UsuarioService } from '../providers/provider.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public userService: UsuarioService,
    public router: Router
  ) { }

  areEquals( field1: string, field2: string ) {

    return ( group: FormGroup ) => {

      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        areEquals: true
      };

    };

  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [ Validators.required, Validators.email ] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.areEquals( 'password', 'password2' ) });

    this.forma.setValue({
      nombre: 'Serginho',
      correo: 'serginho@testing.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      swal({
        title: 'Importante!',
        text: 'Debe aceptar las condiciones',
        type: 'warning',
        confirmButtonText: 'Ok'
      });
      console.log('Debe aceptar las condiciones');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this.userService.crearUsuario( usuario )
        .subscribe( resp => {

          console.log(resp);

          this.router.navigate(['/login']);

        });

  }

}
