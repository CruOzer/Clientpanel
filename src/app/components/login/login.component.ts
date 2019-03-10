import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  constructor(private authService: AuthService, private flashMsg: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(data => {
      if (data) {
        console.log(data);
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMsg.show("You are now logged in", { cssClass: "alert-success", timeout: 4000 });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashMsg.show("Log in failed: " + err.message, { cssClass: "alert-danger", timeout: 4000 });
      });
  }
}
