import { Component } from '@angular/core';
import { Customer, UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-list',
  templateUrl: 'clientes.page.html',
  styleUrls: ['clientes.page.scss']
})
export class ClientesPage {
  private customers: Customer[];

  constructor(private usuariosService: UsuariosService) {
    usuariosService.getCustomers().then(customers => this.customers = customers);
  }

}
