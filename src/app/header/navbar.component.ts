import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'admin-header',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {   //ez lesz a headerunk, azert kell az authService, mert nem mindig akarjuk
  userIsAuthenticated = false;                                //az osszes menuopciot megjeleniteni
  private authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();      //kijelentkezunk, ezaltal a menuopciok eltunnek majd
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
