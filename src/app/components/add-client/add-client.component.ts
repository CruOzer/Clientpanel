import { Component, OnInit, ViewChild } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../modules/Client';

import { SettingsService } from '../../services/settings.service';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  client: Client;
  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;
  constructor(private flashMsg: FlashMessagesService, private clientService: ClientService, private router: Router, private settingsService: SettingsService) { }

  ngOnInit() {
    this.client = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: 0
    };
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMsg.show("Please fill out the form correctly", { cssClass: "alert-danger", timeout: 4000 });
      return;
    }
    this.clientService.newClient(value);
    this.flashMsg.show("New client added", { cssClass: "alert-success", timeout: 4000 });
    this.router.navigate(['/']);
  }

}
