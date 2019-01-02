import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../_models/room';
import {Type} from '../_models/type.enum';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  @Input() room: Room;
  private amountOfHoursBooked: number;


  constructor() {
  }

  ngOnInit() {
    this.amountOfHoursBooked = 1;
  }

  // todo:location adhv breedte & hoogte

  hasSlider(): boolean {
    return this.room['type'] === Type.cafetaria || this.room['type'] === Type.studielandschap;
  }

  isBookable(): boolean {
    return this.room['type'] === Type.klaslokaal
      || this.room['type'] === Type.aula
      || this.room['type'] === Type.vergaderzaal;
  }

  onBookingChange(value: number) {
    this.amountOfHoursBooked = value;
    console.log('trying to book this many hours:' + this.amountOfHoursBooked);
  }
}
