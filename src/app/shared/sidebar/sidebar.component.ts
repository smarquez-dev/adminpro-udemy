import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../providers/provider.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public _sidebar: SidebarService,
               public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

}
