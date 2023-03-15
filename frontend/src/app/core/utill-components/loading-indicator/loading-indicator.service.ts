import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  get progressValue(): number {
    return this._progressValue;
  }

  get showLoading(): boolean {
    return this._showLoading;
  }

  private _showLoading = false;
  private _progressValue = 0;

  constructor() {
  }

  public hide() {
    this._showLoading = false;
  }

  public show(initValue?: number) {
    if (initValue !== undefined) {
      this._progressValue = initValue;
    } else {
      this.resetProgress();
    }
    this._showLoading = true;
  }

  private resetProgress() {
    this._progressValue = 0;
  }

  updateProgressValue(newProgressValue: number) {
    this._progressValue = newProgressValue;
  }
}
