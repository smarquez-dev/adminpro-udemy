import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem( 'ajustes', JSON.stringify( this.ajustes ) );
    // console.log('Guardados los ajustes en LocalStorage!');
  }

  cargarAjustes() {
    if ( localStorage.getItem( 'ajustes' ) ) {
      this.ajustes = JSON.parse( localStorage.getItem( 'ajustes' ) );
      // console.log('Cargando los ajustes del LocalStorage!');
    } else {
      // console.log('Usando valores por defecto!');
    }
    this.aplicarTema( this.ajustes.tema );
  }

  aplicarTema( tema: string ) {
    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.temaUrl = url;
    this.ajustes.tema = tema;

    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
