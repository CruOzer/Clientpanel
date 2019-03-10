import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../modules/Client';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  client: Client;
  id: string;
  disableBalanceOnEdit: boolean = true;

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute, private flashMsg: FlashMessagesService, private settingsService: SettingsService) { }

  ngOnInit() {
    this.client = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: 0
    };
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(data => {
      this.client = data;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }
  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      this.flashMsg.show("Please fill out the form correctly", { cssClass: "alert-danger", timeout: 4000 });
      return;
    }
    value.id = this.id;
    this.clientService.updateClient(value);
    this.flashMsg.show("Client updated", { cssClass: "alert-success", timeout: 4000 });
    this.router.navigate([`/client/${this.id}`]);
  }
}