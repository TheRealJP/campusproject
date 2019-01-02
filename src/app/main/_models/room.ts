import {Type} from './type.enum';

export class Room {
  naam: string;
  type: Type;
  bezet: boolean;
  capaciteit?: number;
  beamer?: boolean;
  drukte: number;
  hoogte: number;
  breedte: number;
}
