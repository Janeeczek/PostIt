import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  get showLoading(): boolean {
    return this._showLoading;
  }

  private _showLoading = true;
  constructor() {}

  public hide(){
    this._showLoading = false;
  }
  public show(){
    this._showLoading = true;

  }
}
