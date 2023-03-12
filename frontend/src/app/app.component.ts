import {Component} from '@angular/core';
import {AuthService} from "./core/auth/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "./core/toast/toast.service";
import {LoadingIndicatorService} from "./core/loading-indicator/loading-indicator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router, private toastService: ToastService, private loadingIndicatorService: LoadingIndicatorService) {
    this.router.navigateByUrl('/');
  }
  isLoggedIn(){
    return this.authService.isUserLoggedIn();
  }
  getUserLogin(){
    return this.authService.getUserLogin();
  }
  logout() {
    this.authService.logout();
  }
}
