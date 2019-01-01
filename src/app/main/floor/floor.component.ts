import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../_models/room';
import {Floor} from '../_models/floor';
import {FloorService} from '../_services/floor.service';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  @Input() floor: Floor;
  @Input() rooms: Room[];
  @Input() floorLevel: number;

  constructor(private floorService: FloorService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.floorService.fetchFloor(this.floorLevel).subscribe((floor) => {
      this.rooms = _.get(floor[0], 'rooms');
      console.log('after applying' + this.rooms[0]['name']);
    });

  }

}
