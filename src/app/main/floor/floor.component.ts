import {Component, OnInit} from '@angular/core';
import {Room} from '../_models/room';
import {Observable} from 'rxjs';
import {Type} from '../_models/type.enum';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  floorLevel: number;
  rooms: Room[] = [
    {naam: 'lokaal 404', drukte: 100, bezet: true, hoogte: 100, breedte: 100, type: Type.klaslokaal, floor: 4},
    {naam: 'lokaal 100', drukte: 8, bezet: true, hoogte: 100, breedte: 200, type: Type.vergaderzaal, floor: 1}
  ];

  constructor() {
  }

  ngOnInit() {
    // mongodb --> floor_collectie.find({floorLevel: floorLevel}) returns Floor{Room[]}
    this.fetchRooms().subscribe(() => {
      return '';
    });
  }

  private fetchRooms(): Observable<Room[]> {
    return;
  }
}
