import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {

  @Input() leyenda: string = 'Leyenda';
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() chartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
