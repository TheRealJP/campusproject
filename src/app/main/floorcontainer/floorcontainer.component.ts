import {Component, OnInit} from '@angular/core';
import {Floor} from '../_models/floor';
import {FloorService} from '../_services/floor.service';

@Component({
  selector: 'app-floorcontainer',
  templateUrl: './floorcontainer.component.html',
  styleUrls: ['./floorcontainer.component.scss']
})
export class FloorcontainerComponent implements OnInit {

  floors: Floor[] = [
    {floorLevel: 1, rooms: []},
    {floorLevel: 2, rooms: []},
    {floorLevel: 3, rooms: []}
  ];

  constructor(private floorService: FloorService) {
    floorService.fetchFloors().subscribe((f) => {
      console.log(f);
      this.floors = f;
    });
  }

  ngOnInit() {

  }

}
