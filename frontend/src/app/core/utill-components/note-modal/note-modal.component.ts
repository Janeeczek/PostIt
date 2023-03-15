import {Component, Input, OnInit} from '@angular/core';
import {ModalCloseReason} from "../../../Object";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})
export class NoteModalComponent implements OnInit {
  @Input() title: any;
  @Input() content: any;
  @Input() modalHeader: any;
  form: FormGroup;

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      content: new FormControl('', [
        Validators.maxLength(200),
      ]),
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      title: this.title,
      content: this.content
    });
  }

  public close() {
    this.activeModal.dismiss(ModalCloseReason.CLOSE);

  }

  public success() {
    this.activeModal.close({title: this.form.value['title'], content: this.form.value['content']});
  }
}
