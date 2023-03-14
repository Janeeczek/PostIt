import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalCloseReason} from "../../../Object";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  public close() {
    this.activeModal.dismiss(ModalCloseReason.CLOSE);

  }
  public success() {
    this.activeModal.close();
  }

}
