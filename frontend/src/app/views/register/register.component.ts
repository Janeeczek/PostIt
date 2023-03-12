import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  login!: string;
  password!: string;
  constructor(private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }
  public handleRegister() {
    this.authService.register(this.login, this.password);
  }
}
