import {Injectable, OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthServiceNormal} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  user: User;

  constructor(private authService: AuthServiceNormal, private router: Router,
              private token: TokenStorageService) {
    this.authService.getUserByUsername(this.token.getUsername()).subscribe(data => {
      this.user = data;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.user !== undefined) {
      if (this.user.provider !== 'OmegaLUL') {
        return false;
      }
      return true;
    }
  }
}
