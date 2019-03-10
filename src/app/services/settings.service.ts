import { Injectable } from '@angular/core';

import { Settings } from '../modules/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  }

  constructor() {
    const s = localStorage.getItem('settings');
    if (s != null) {
      this.settings = JSON.parse(s);
    }
    else {
      this.settings == {
        allowRegistration: true,
        disableBalanceOnAdd: false,
        disableBalanceOnEdit: false
      };
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(newSettings: Settings) {
    this.settings = newSettings;
    localStorage.setItem('settings', JSON.stringify(newSettings));
  }
}
