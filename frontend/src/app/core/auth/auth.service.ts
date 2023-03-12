import {Injectable} from '@angular/core';
import {map} from "rxjs";
import {HttpProviderService} from "../http/http-provider.service";
import {JwtToken, AuthResponse} from "../http/response/response";
import {ToastService} from "../toast/toast.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpProviderService, private toastService: ToastService, private router: Router,
  ) {
  }

  public authenticate(login: string, password: string) {
    this.httpService.login({login, password})
      .pipe(
        map((jwtToken: JwtToken) => {
          sessionStorage.setItem("login", login);
          let tokenStr = "Bearer " + jwtToken.token;
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("password", password);
          return jwtToken;
        })
      ).subscribe({
      next: () => this.onSuccessLogin(),
      error: err => this.toastService.showDanger(err.error.message)
    });
  }

  public logout() {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("password");
    this.toastService.showStandard('Successfully logged out');
    this.router.navigateByUrl('/login');

  }

  public register(username: string, password: string) {
    return this.httpService.register({username, password}).subscribe({
      next: () => this.onSuccessRegister(),
      error: (err) => this.toastService.showDanger(err.error.message)

    })
  }

  public isUserLoggedIn() {
    let user = sessionStorage.getItem("login");
    return !(user === null);
  }

  private getAuthToken(): string {
    let item = sessionStorage.getItem('token');
    return item != null ? item : '';
  }

  public getUserLogin(): string {
    let item = sessionStorage.getItem('login');
    return item != null ? item : '';
  }

  private getUserPassword(): string {
    let item = sessionStorage.getItem('password');
    return item != null ? item : '';
  }

  private onSuccessLogin() {
    this.router.navigate(['']);
  }

  private onSuccessRegister() {
    this.toastService.showSuccess('Successfully registered');
    this.router.navigate(['/login']);
  }
}
