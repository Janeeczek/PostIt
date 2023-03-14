import {Component, Input, OnInit} from '@angular/core';
import {NoteService} from "../../../view-objects/note/note.service";
import {ModalCloseReason, ModalType} from "../../../Object";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})
export class NoteModalComponent implements OnInit {
  @Input() title: any;
  @Input() content: any;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  public close() {
    this.activeModal.dismiss(ModalCloseReason.CLOSE);

  }
  public success() {
    this.activeModal.close({title: this.title, content: this.content});
  }
}
