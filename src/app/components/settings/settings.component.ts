import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../modules/Settings';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: Settings;
  constructor(private router: Router, private flashMsg: FlashMessagesService, private settingsService: SettingsService) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMsg.show("Settings saved", { cssClass: "alert-success", timeout: 4000 });
    this.router.navigate(['/']);
  }

}
