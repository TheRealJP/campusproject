import {Injectable} from '@angular/core';
import {Type} from '../_models/type.enum';
import {Room} from '../_models/room';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomService {


  // todo: fetch room id
  constructor(private activatedRoute: ActivatedRoute) {
  }


}
