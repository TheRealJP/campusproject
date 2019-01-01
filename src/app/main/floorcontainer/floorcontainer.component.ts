import {Component, OnInit} from '@angular/core';
import {Floor} from '../_models/floor';
import {FloorService} from '../_services/floor.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-floorcontainer',
  templateUrl: './floorcontainer.component.html',
  styleUrls: ['./floorcontainer.component.scss']
})
export class FloorcontainerComponent implements OnInit {
  floor: Floor = {floorLevel: 0, rooms: []};
  private error = '';

  constructor(private floorService: FloorService, private route: ActivatedRoute) {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.floorService.fetchFloor(+params.get('id'))))
      .subscribe((floor: Floor) => {
          this.floor.floorLevel = floor[0].floorlevel;
          this.floor.rooms = floor[0].rooms;
        }, error => this.error = error
      );
  }

  ngOnInit(): void {
  }
}
