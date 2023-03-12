import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login!: string;
  password!: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  handleLogin() {
    this.authService.authenticate(this.login, this.password);

  }
}
