import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Room} from '../_models/room';
import {RoomIconStatus} from '../_models/roomiconstatus';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit, OnChanges {
  @Input() rooms: Room[];
  @Input() floorLevel: number;
  @Input() roomIconStatus: RoomIconStatus;
  @Input() inFloorMode: Boolean;
  private selectedRoom: string;
  private error: '';

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log('floorcomponent floormode:' + this.inFloorMode);
  }

  selectRoom(rname: string) {
    this.selectedRoom = rname;
  }
}
