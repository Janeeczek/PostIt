export interface RegisterRequest {
  username: string;
  password: string;
}
export interface LoginRequest {
  login: string;
  password: string;
}
export interface NoteRequest {
  id?: number;
  userId?: number;
  title?: string;
  content?: string;
  createdAt?: Date;
}
export interface NoteRequest {
  title?: string;
  content?: string;
}

