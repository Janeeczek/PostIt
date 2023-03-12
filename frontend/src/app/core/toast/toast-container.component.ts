import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from "./toast.service";

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css']
})
export class ToastContainerComponent implements OnInit {

  constructor(public toastService: ToastService) {}

  isTemplate(toast:any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  ngOnInit(): void {
  }

}
