import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {AuthService} from "./core/auth/auth.service";
import {HttpInterceptorService} from "./core/http/http-interceptor.service";
import {NoteComponent} from './view-objects/note/note.component';
import {RouterModule, Routes} from "@angular/router";
import {LoadingIndicatorComponent} from './core/utill-components/loading-indicator/loading-indicator.component';
import {ToastContainerComponent} from "./core/utill-components/toast/toast-container.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./views/register/register.component";
import {LoginComponent} from "./views/login/login.component";
import {HomeComponent} from "./views/home/home.component";
import {allIcons, NgxBootstrapIconsModule} from 'ngx-bootstrap-icons';
import {NoteModalComponent} from './core/utill-components/note-modal/note-modal.component';
import {NoteService} from "./view-objects/note/note.service";
import {DeleteModalComponent} from './core/utill-components/delete-modal/delete-modal.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LoadingIndicatorComponent,
    ToastContainerComponent,
    NoteModalComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    HttpClientXsrfModule,
    NgxBootstrapIconsModule.pick(allIcons),
  ],
  providers: [
    AuthService,
    NoteService,
    NgbActiveModal,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
