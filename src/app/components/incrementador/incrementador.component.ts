import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})

export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onChanges( newValue: number ) {
    // console.log('Esto es newValue: ', newValue);

    // const elemHTML: any = document.getElementsByName('progreso')[0];
    // console.log( this.txtProgress );

    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );
  }

  actualizar( porcentaje: number ) {
    if ( this.progreso >= 100 && porcentaje > 0 ) {
      return;
    }

    if ( this.progreso <= 0 && porcentaje < 0 ) {
      return;
    }

    this.progreso += porcentaje;
    // * Emitimos el evento una vez cambiado el valor
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }
}
