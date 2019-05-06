import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-list',
  templateUrl: 'clientes.page.html',
  styleUrls: ['clientes.page.scss']
})
export class ClientesPage {
  private customers: Customer[];

  constructor(private router: Router, private usuariosService: UsuariosService) {
  }

  ionViewWillEnter() {
    this.usuariosService.getCustomers().then(customers => this.customers = customers);
  }

  detailsCustomer(fbid: string) {
    this.router.navigateByUrl(`/usuario/${fbid}`);
  }

}
