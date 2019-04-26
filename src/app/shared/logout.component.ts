import { CartService } from './../_services/cart.service';
import { AuthService } from './../_services/auth.service';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: ''
  })
export class LogoutComponent implements OnInit {

constructor(
  private _authService: AuthService,
  private cartService: CartService,
  private router: Router) {}

ngOnInit() {
    this._authService.logout();
    this.cartService.createOrClearCartInLocalStorage();
    this.router.navigate(['/home']);
}

}