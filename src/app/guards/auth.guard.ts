import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

import { CanActivate, Router } from '@angular/router';

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private afAuth: AngularFireAuth, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.pipe(map(value => {
            if (!value) {
                this.router.navigate(['/login']);
                return false;
            }
            else {
                return true;
            }
        }));
    }
}
