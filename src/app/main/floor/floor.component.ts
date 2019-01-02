import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../_models/room';
import {FloorService} from '../_services/floor.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {
  @Input() rooms: Room[];
  @Input() floorLevel: number;
  private selectedRoom: Room;
  private error: '';

  constructor(private floorService: FloorService) {
  }

  ngOnInit() {

  }

  selectRoom(r: Room) {
    if (r === this.selectedRoom) {
      return;
    }

    this.selectedRoom = r;
    console.log('selected room:' + r['name']);
  }
}
