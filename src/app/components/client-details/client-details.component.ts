import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../modules/Client';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute, private flashMsg: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(data => {
      this.hasBalance = data != null && data.balance > 0;
      this.client = data;
    });
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.client);
    this.flashMsg.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 4000
    });
  }

  onDeleteClick(){
    this.clientService.deleteClient(this.client);
    
    this.flashMsg.show("Client remove", { cssClass: "alert-success", timeout: 4000 });
    this.router.navigate(['/']);
  }
}
