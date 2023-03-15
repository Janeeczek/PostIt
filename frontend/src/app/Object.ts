export interface Note {
  id: number;
  title: string;
  text: string;
  createdAt: Date;

}

export enum ModalCloseReason {
  CLOSE,
  SUCCESS
}
