import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../_models/room';
import {Type} from '../_models/type.enum';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})

// todo:location adhv breedte & hoogte
export class RoomComponent implements OnInit {
  @Input() room: Room;
  @Input() selectedRoom: string;
  isThisRoomSelected: boolean;
  amountOfHoursBooked: number;
  value = 0;
  timerValue: number;
  roomColor: string;

  constructor() {
  }

  ngOnInit() {
    this.amountOfHoursBooked = 1;
  }


  hasSlider(): boolean {
    return this.room['type'] === Type.cafetaria || this.room['type'] === Type.studielandschap;
  }

  isBookable(): boolean {
    return this.room['type'] === Type.klaslokaal
      || this.room['type'] === Type.aula
      || this.room['type'] === Type.vergaderzaal && !this.room['bezet'];
  }

  onBookingChange(value: number) {
    if (this.room['bezet'] !== true) {
      this.amountOfHoursBooked = value;
    }
    console.log('trying to book this many hours:' + this.amountOfHoursBooked);
  }

  bookRoom() {
    console.log(this.room['bezet']);
    this.room['bezet'] = true;
    console.log(this.room['bezet']);
  }

  selectRoom() {
    if (this.room.naam !== this.selectedRoom) {
      this.isThisRoomSelected = false;
      return;
    }

    this.isThisRoomSelected = !this.isThisRoomSelected;
    console.log('selected room:' + this.room['name']);
  }


  getColor() {
    const percentage = (((this.room['drukte'] - 1) * (100 - 1)) / (this.room['capaciteit'] - 1)) + 1;
    console.log('roomColor before:' + this.roomColor);
    console.log('' + percentage);
    const r = percentage < 50 ? 255 : Math.floor(255 - (percentage * 2 - 100) * 255 / 100);
    const g = percentage > 50 ? 255 : Math.floor((percentage * 2) * 255 / 100);
    this.roomColor = 'rgb(' + r + ',' + g + ',0)';
    console.log('roomColor after:' + this.roomColor);

  }

  // getColor() {
  //   // 1 is reddish
  //   // 120 is green
  //   // switch between time of booking OR slider value
  //
  //
  //   const hue = ((1 - percentage * 120).toString(10));
  //   this.roomColor = ['hsl(', hue, ',100%,50%)'].join('');
  //
  // }
}
