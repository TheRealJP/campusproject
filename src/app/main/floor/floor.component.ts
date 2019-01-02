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
  private selectedRoom: string;
  private error: '';

  constructor(private floorService: FloorService) {
  }

  ngOnInit() {

  }

  selectRoom(rname: string) {
    this.selectedRoom = rname;
  }
}
