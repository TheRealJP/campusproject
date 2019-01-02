import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../_models/room';
import {Type} from '../_models/type.enum';
import {Subscription, timer} from 'rxjs';

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
  roomColor = 'rgb(255,255,255)';
  private timerSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.initRoomColor();
    this.amountOfHoursBooked = 1;
  }

  // todo: deselect room at given time
  //  deselect room when selecting another
  selectRoom() {
    if (this.room['naam'] !== this.selectedRoom) {
      this.isThisRoomSelected = false;
      return;
    }

    this.isThisRoomSelected = !this.isThisRoomSelected;
    console.log('selected room:' + this.room['name']);
  }

  hasSlider(): boolean {
    return this.room['type'] === Type.cafetaria
      || this.room['type'] === Type.studielandschap;
  }

  isBookable(): boolean {
    return this.room['type'] === Type.klaslokaal
      || this.room['type'] === Type.aula
      || this.room['type'] === Type.vergaderzaal;
  }

  onBookingChange(value: number) {
    if (this.room['bezet'] !== true) {
      this.amountOfHoursBooked = value;
    }
    console.log('trying to book this many hours:' + this.amountOfHoursBooked);
  }

  bookRoom() {
    this.room['bezet'] = true;
    this.bookingTimer();    // updates background color based on timer subscription values
  }

  // updates roomColor
  getColor(value: number, maxValue: number) {
    // replace range of for example: 1-500 to 1-100
    const percentage = (((value - 1) * (100 - 1)) / (maxValue - 1)) + 1;
    const r = percentage < 50 ? 255 : Math.floor(255 - (percentage * 2 - 100) * 255 / 100);
    const g = percentage > 50 ? 255 : Math.floor((percentage * 2) * 255 / 100);

    // switches places with green and red depending on if its a bookable room
    // so it starts from red and goes to green or the other way around
    const redPlace = this.isBookable() ? r : g;
    const greenPlace = this.isBookable() ? g : r;
    this.roomColor = 'rgb(' + redPlace + ',' + greenPlace + ',0)';
  }

  private initRoomColor() {
    if (this.hasSlider()) {
      this.getColor(this.room['drukte'], this.room['capaciteit']);
    } else if (this.isBookable() && this.room['bezet']) {
      console.log('reached');
      this.roomColor = 'rgb(255,255,255)';
    }
  }

  private bookingTimer() {
    const maxHours = this.amountOfHoursBooked * 3600;
    console.log('maxhours:' + maxHours);
    let timeObject = new Date();
    timeObject = new Date(timeObject.getTime() + maxHours * 10);
    console.log('next reservation can be made in:' + timeObject);

    // change periodOrScheduler to make it go faster, default should be 1000 == 1s
    this.timerSubscription = timer(0, 10).subscribe(t => {
      this.getColor(t, maxHours);
      if (t >= maxHours) {
        console.log('maxhours reached:' + maxHours);
        this.room['bezet'] = false;
        this.timerSubscription.unsubscribe();
      }
    });
  }
}
