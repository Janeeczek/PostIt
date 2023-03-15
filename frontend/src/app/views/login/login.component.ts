import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
      ]),
    });
  }

  ngOnInit(): void {

  }

  handleLogin() {
    this.authService.authenticate(this.form.value['login'], this.form.value['password']);
  }
}
