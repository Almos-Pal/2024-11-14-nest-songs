import { IsDefined } from 'class-validator';

export class Song {
  @IsDefined()
  id: number;
  cim: string;
  szerzo: string;
  hossz: number;
  ar: number;
  ertekeles: number;
}
