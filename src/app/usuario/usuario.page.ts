import { Component, OnInit } from '@angular/core';
import { Usuario, UsuariosService } from '../service/usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  private usuario: Usuario = {name: 'Cargando...', fbid: '', email: ''};

  constructor(private route: ActivatedRoute, private usuariosService: UsuariosService) {
  }

  ngOnInit() {
    const fbid: string = this.route.snapshot.paramMap.get('id');
    this.usuariosService.getUsuario(fbid).then(usuario => this.usuario = usuario);
  }

  habilitarChofer(fbid: string) {
    this.usuariosService.habilitacionUsuario(this.usuario, true);
    this.usuario.habilitado = true;
  }

  deshabilitarChofer(fbid: string) {
    this.usuariosService.habilitacionUsuario(this.usuario, false);
    this.usuario.habilitado = false;
  }

}
