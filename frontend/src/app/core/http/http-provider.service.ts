import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DEFAULT_API_AUTH, DEFAULT_API_NOTE} from "../consts/http-consts";
import {LoginRequest, NoteRequest, RegisterRequest} from "./request/request";
import {JwtToken} from "./response/response";
import {Observable} from "rxjs";
import {Note} from "../../Object";


@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private http: HttpClient) {
  }

  public register(request: RegisterRequest) {
    return this.http.post<string>(DEFAULT_API_AUTH + '/register', request);
  }

  public login(request: LoginRequest) {
    return this.http.post<JwtToken>(DEFAULT_API_AUTH + '/authenticate', request);
  }
  public checkLogin() {
    return this.http.get(DEFAULT_API_AUTH + '/user');
  }

  public addNote(request: NoteRequest) {
    return this.http.post<string>(DEFAULT_API_NOTE + '/add', request);
  }

  public editNote(id: number, request: NoteRequest) {
    return this.http.post<string>(DEFAULT_API_NOTE + '/edit/' + id, request);
  }

  public deleteNote(id: number) {
    return this.http.delete<string>(DEFAULT_API_NOTE + '/delete/' + id);
  }
  public allNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(DEFAULT_API_NOTE + '/all');
  }
}
