import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../_models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  @Input() room: Room;
  name: string;

  constructor() {
  }

  ngOnInit() {
    this.name = this.room['name'];
  }

  // todo:location adhv breedte & hoogte
  // icoontjes laden

}
