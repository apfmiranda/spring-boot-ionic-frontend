import { AuthService } from './../_services/auth.service';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: ''
  })
export class LogoutComponent implements OnInit {

constructor(private _authService: AuthService, private router: Router) {}

ngOnInit() {
    this._authService.logout();
    this.router.navigate(['/home']);
}

}