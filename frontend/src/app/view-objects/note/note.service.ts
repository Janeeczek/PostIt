import { Injectable } from '@angular/core';
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NoteModalComponent} from "../../core/utill-components/note-modal/note-modal.component";
import {Note} from "../../Object";
import {HttpProviderService} from "../../core/http/http-provider.service";
import {ToastService} from "../../core/utill-components/toast/toast.service";
import {LoadingIndicatorService} from "../../core/utill-components/loading-indicator/loading-indicator.service";
import {DeleteModalComponent} from "../../core/utill-components/delete-modal/delete-modal.component";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  get notesList(): Note[] {
    return this._notesList;
  }
  private _notesList: Note[] = [];
  constructor( private modalService: NgbModal, private httpProviderService: HttpProviderService, private toastService: ToastService,    private loadingIndicatorService: LoadingIndicatorService
  ) { }

  public startAddNote() {
    const modalRef = this.modalService.open(NoteModalComponent, {backdrop: 'static'})
    modalRef.result.then((result)=> {
        this.loadingIndicatorService.show(100);
        this.httpProviderService.addNote({content: result.content, title: result.title}).subscribe({
          next: () => this.onSuccess('Successfully added note'),
          error: err => this.onError(err),
          complete: () => this.onComplete()
        })
    });
  }
  public startEditNote(note: Note) {
    const modalRef = this.modalService.open(NoteModalComponent, {backdrop: 'static'})
    modalRef.componentInstance.title = note.title;
    modalRef.componentInstance.content =  note.text;
    modalRef.result.then((result)=> {
      this.loadingIndicatorService.show(100);
      this.httpProviderService.editNote( note.id, {content: result.content, title: result.title}).subscribe({
        next: () => this.onSuccess("Successfully edited note"),
        error: err => this.onError(err),
        complete: () => this.onComplete()
      })
    });
  }
  public startDeleteNote(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent, {backdrop: 'static'})
    modalRef.result.then(()=> {
      this.loadingIndicatorService.show(100);
      this.httpProviderService.deleteNote(id).subscribe({
        next: () => this.onSuccess("Successfully deleted note"),
        error: err => this.onError(err),
        complete: () => this.onComplete()
      })
    });
  }

  public fetchNotes() {
    this.loadingIndicatorService.show(100);
    this.httpProviderService.allNotes().subscribe({
      next: (notesList: Note[]) => this._notesList = notesList,
      error: err => this.onError(err),
      complete: () => this.loadingIndicatorService.hide()
    })
  }
  private onSuccess(msg: string) {
    this.toastService.showStandard(msg);

  }
  private onError(err: any) {
    this.loadingIndicatorService.hide();
    this.toastService.showDanger(err.error.message)
  }
  private onComplete() {
    this.loadingIndicatorService.hide();
    this.fetchNotes();
  }
}
