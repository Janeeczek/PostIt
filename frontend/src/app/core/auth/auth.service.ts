import {Injectable} from '@angular/core';
import {map, tap} from "rxjs";
import {HttpProviderService} from "../http/http-provider.service";
import {JwtToken} from "../http/response/response";
import {Router} from "@angular/router";
import {LoadingIndicatorService} from "../utill-components/loading-indicator/loading-indicator.service";
import {ToastService} from "../utill-components/toast/toast.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpProviderService, private toastService: ToastService, private router: Router,
              private loadingIndicatorService: LoadingIndicatorService
  ) {
  }

  public authenticate(login: string, password: string) {
    this.loadingIndicatorService.show();
    this.httpService.login({login, password})
      .pipe(
        tap(() => this.loadingIndicatorService.updateProgressValue(50)),
        map((jwtToken: JwtToken) => {
          const tokenStr = "Bearer " + jwtToken.token;
          sessionStorage.setItem("login", login);
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("password", password);
          return jwtToken;
        }),
      ).subscribe({
      next: () => this.onSuccessLogin(),
      error: (err) => this.onError(err.error),
      complete: () => this.loadingIndicatorService.hide()
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
    this.loadingIndicatorService.show();
    return this.httpService.register({username, password}).subscribe({
      next: () => this.onSuccessRegister(),
      error: (err) => this.onError(err.error),
      complete: () => this.loadingIndicatorService.hide()
    })
  }

  public isUserLoggedIn() {
    let user = sessionStorage.getItem("login");
    return !(user === null);
  }

  public getUserLogin(): string {
    let item = sessionStorage.getItem('login');
    return item != null ? item : '';
  }

  private onSuccessLogin() {
    this.router.navigate(['']);
  }

  private onSuccessRegister() {
    this.toastService.showSuccess('Successfully registered');
    this.router.navigate(['/login']);
  }

  private onError(errors: any) {
    this.loadingIndicatorService.hide();
    Object.keys(errors).forEach((key) => {
      this.toastService.showDanger(errors[key])
    });
  }
}
