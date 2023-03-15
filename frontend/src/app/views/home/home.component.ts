import {Component, OnInit} from '@angular/core';
import {Note} from "../../Object";
import {NoteService} from "../../view-objects/note/note.service";


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
