import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../../Object";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() data!: Note ;
  constructor() { }

  ngOnInit(): void {
  }

}
