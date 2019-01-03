import {Component, OnInit} from '@angular/core';
import {FloorService} from '../_services/floor.service';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../_models/room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  room: Room;

  constructor(private floorService: FloorService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('roomid from url outside lambda:' + id);
    this.floorService.fetchRoomById(id).subscribe(r => {
      this.room = r;
      console.log('fetched room:' + JSON.stringify(this.room));
    });
  }

  hasSlider(): boolean {
    return this.floorService.hasSlider(this.room);
  }

  isBookable(): boolean {
    return this.floorService.isBookable(this.room);
  }


  submitRoom() {
    // this.floorService.updateRoom();
  }
}
