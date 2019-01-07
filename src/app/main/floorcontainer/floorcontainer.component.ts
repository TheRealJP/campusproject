import {Component, HostListener, OnInit} from '@angular/core';
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
    id: '',
    floorLevel: 0,
    rooms: [{id: '004', naam: 'test', type: Type.vergaderzaal, hoogte: 100, breedte: 100, drukte: 100, bezet: true, y: 0, x: 0}]
  };
  floorLevel: number;
  rooms: Room[];
  inFloorMode: Boolean;
  roomIconsStatus: RoomIconStatus;
  desktop = true;


  constructor(private floorService: FloorService,
              private route: ActivatedRoute) {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.desktop = event.target.innerWidth >= 600;
  }

  ngOnInit(): void {
    this.roomIconsStatus = {naam: true, type: true, bezet: true, drukte: true, beamer: false, capaciteit: false};
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.floorService.fetchFloor(+params.get('id'))))
      .subscribe((floor: Floor) => {
          this.floorLevel = floor[0].floorlevel;
          this.rooms = floor[0].rooms;
          this.floor = floor[0];
          console.log('we are at floor ' + this.floorLevel);
        }, error => this.error = error
      );
  }

  onListFloorSwitch(value: any) {
    this.inFloorMode = value;
  }

  toggleIconProperty(propertyName: string) {
    this.roomIconsStatus[propertyName] = !this.roomIconsStatus[propertyName];
    console.log(propertyName + ':' + this.roomIconsStatus[propertyName]);
  }
}
