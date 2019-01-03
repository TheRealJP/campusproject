import {Type} from './type.enum';

export class Room {
  id: string;
  naam: string;
  type: Type;
  bezet: boolean;
  capaciteit?: number;
  beamer?: boolean;
  drukte: number;
  hoogte: number;
  breedte: number;
}
