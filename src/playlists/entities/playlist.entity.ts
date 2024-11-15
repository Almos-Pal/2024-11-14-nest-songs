import { IsDefined } from 'class-validator';

export class Playlist {
  @IsDefined()
  playListId: number;
  nev: string;
}
