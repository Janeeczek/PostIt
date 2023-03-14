import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../../Object";
import {NoteService} from "./note.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() data!: Note;
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {

  }

  onEdit() {
    this.noteService.startEditNote(this.data);
  }

  onDelete() {
    this.noteService.startDeleteNote(this.data.id);

  }

}
