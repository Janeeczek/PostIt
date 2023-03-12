import {Component, OnInit} from '@angular/core';
import {Note} from "../../Object";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private noteList: Note[] = [];
  public note: Note;

  constructor() {
    this.note = {id: 1, title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m", text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu", createdAt: new Date()};
  }

  ngOnInit(): void {
  }

}
