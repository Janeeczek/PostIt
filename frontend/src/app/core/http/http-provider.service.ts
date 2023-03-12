import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DEFAULT_API_AUTH} from "../consts/http-consts";
import {LoginRequest, RegisterRequest} from "./request/request";
import {JwtToken} from "./response/response";


@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private http: HttpClient) {
  }

  public register(request: RegisterRequest) {
    return this.http.post<string>(DEFAULT_API_AUTH + '/register', request);
  }

  public login(request: LoginRequest) {
    return this.http.post<JwtToken>(DEFAULT_API_AUTH + '/authenticate', request);
  }

  public checkLogin() {
    return this.http.get(DEFAULT_API_AUTH + '/user');
  }
}
