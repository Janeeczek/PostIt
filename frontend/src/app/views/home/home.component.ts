import {Component, OnInit} from '@angular/core';
import {Note} from "../../Object";
import {NoteService} from "../../view-objects/note/note.service";
export const CONTTEXT =  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu";
export const TITLETEXT =  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private noteService: NoteService) {


  }

  ngOnInit(): void {
    this.noteService.fetchNotes();
  }
  public getNotes(): Note[] {
    return this.noteService.notesList;
  }

}
