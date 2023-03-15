import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/auth/auth.service";
import {Router} from "@angular/router";
import {NoteService} from "./view-objects/note/note.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private noteService: NoteService) {
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/login');
    }


  }

  isLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  getUserLogin() {
    return this.authService.getUserLogin();
  }

  logout() {
    this.authService.logout();
  }

  addNote() {
    this.noteService.startAddNote();
  }


}
