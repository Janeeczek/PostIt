export interface Note {
  id: number;
  title: string;
  text: string;
  createdAt: Date;

}
export enum ModalType {
  ADD,
  EDIT
}
export enum ModalCloseReason{
  CLOSE,
  SUCCESS
}
