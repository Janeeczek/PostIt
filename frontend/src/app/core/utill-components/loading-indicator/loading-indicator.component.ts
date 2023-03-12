import { Component, OnInit } from '@angular/core';
import {LoadingIndicatorService} from "./loading-indicator.service";

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {

  constructor(private loadingIndicatorService:LoadingIndicatorService) { }

  ngOnInit(): void {
  }
  public shouldShowLoading() {
    return this.loadingIndicatorService.showLoading;
  }

  public progressValue() {
    return this.loadingIndicatorService.progressValue;
  }
}
