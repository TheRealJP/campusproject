import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../_models/room';
import {RoomIconStatus} from '../_models/roomiconstatus';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {
  @Input() rooms: Room[];
  @Input() floorLevel: number;
  @Input() roomIconStatus: RoomIconStatus;
  @Input() inFloorMode: boolean;

  private selectedRoom: string;
  private error: '';

  constructor() {
  }

  ngOnInit() {
  }

  selectRoom(rname: string) {
    this.selectedRoom = rname;
  }
}
