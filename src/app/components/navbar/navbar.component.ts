import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  constructor(private authService: AuthService, private router: Router, private flashMsg: FlashMessagesService, private settingsService: SettingsService) { }


  ngOnInit() {
    this.authService.getAuth().subscribe(data => {
      if (data) {
        this.isLoggedIn = true;
        this.loggedInUser = data.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister=this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMsg.show("You are now logged out", { cssClass: "alert-success", timeout: 4000 });
    this.router.navigate(['/login']);
  }
}
