import { IsDefined } from 'class-validator';

export class CreatePlaylistDto {
  @IsDefined()
  nev: string;
}
