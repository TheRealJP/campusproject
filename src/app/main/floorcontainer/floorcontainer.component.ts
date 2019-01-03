import {Component, OnInit} from '@angular/core';
import {Floor} from '../_models/floor';
import {FloorService} from '../_services/floor.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Type} from '../_models/type.enum';
import {Room} from '../_models/room';
import {RoomIconStatus} from '../_models/roomiconstatus';


@Component({
  selector: 'app-floorcontainer',
  templateUrl: './floorcontainer.component.html',
  styleUrls: ['./floorcontainer.component.scss']
})
export class FloorcontainerComponent implements OnInit {
  error = '';
  floor: Floor = {
    floorLevel: 0,
    rooms: [{id: '004', naam: 'test', type: Type.vergaderzaal, hoogte: 100, breedte: 100, drukte: 100, bezet: true}]
  };
  floorLevel: number;
  rooms: Room[];
  inFloorMode = false;
  roomIconsStatus: RoomIconStatus;

  constructor(private floorService: FloorService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.roomIconsStatus = {naam: true, type: true, bezet: true, drukte: true, beamer: false, capaciteit: false};
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.floorService.fetchFloor(+params.get('id'))))
      .subscribe((floor: Floor) => {
          this.floorLevel = floor[0].floorlevel;
          this.rooms = floor[0].rooms;
          this.floor = floor[0];
          console.log(this.floorLevel);
        }, error => this.error = error
      );
  }

  onListFloorSwitch(value: any) {
    this.inFloorMode = value;

    if (value === 'false') {
      console.log('switched to list mode');
    } else {
      console.log('switched to floor mode');
    }
  }

  toggleIconProperty(propertyName: string) {
    this.roomIconsStatus[propertyName] = !this.roomIconsStatus[propertyName];
    console.log(propertyName + ':' + this.roomIconsStatus[propertyName]);
  }
}
