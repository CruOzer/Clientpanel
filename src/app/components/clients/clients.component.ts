import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../modules/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwed: number;
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
      this.totalOwed = this.getTotalOwed();
    });
  }
  getTotalOwed(): number {
    return this.clients.reduce((tot, item) => tot + item.balance, 0);
  }

}
