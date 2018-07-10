import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.retornaObservable()
    .subscribe(
      numero => console.log('Subs: ', numero),
      error => console.error('Error en el obs: ', error),
      () => console.log('El observador terminó!')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Se cierra la página!');
    this.subscription.unsubscribe();
  }

  retornaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error('Cagüeeeeeeeeeen!');
        // }

      }, 1000 );

    }).pipe(
      map( resp => resp.valor ),
      filter( (valor, index) => {
        if ( (valor % 2) === 1  ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
        // return true;
      })
    );

    // return obs;

  }

}
