import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../_models/room';
import {Type} from '../_models/type.enum';
import {Subscription, timer} from 'rxjs';
import {RoomIconStatus} from '../_models/roomiconstatus';
import {Router} from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})

// todo:location adhv breedte & hoogte
export class RoomComponent implements OnInit {
  @Input() room: Room;
  @Input() selectedRoom: string;
  @Input() iconStatus: RoomIconStatus;
  @Input() inFloorMode: Boolean;
  isThisRoomSelected: boolean;
  amountOfHoursBooked: number;
  roomColor = 'rgb(255,255,255)';

  private reservationSubscription: Subscription;
  private unselectSubscription: Subscription;
  private currentStyles: {
    backgroundColor: string; top: string; left: string; width: string; height: string
  };
  private nextBooking: string;

  constructor(private router: Router) {
  }


  ngOnInit() {
    this.initRoomColor();
    this.amountOfHoursBooked = 1;
    this.currentStyles = {
      'backgroundColor': this.roomColor,
      'top': this.inFloorMode ? this.room['y'] + 'px' : 0 + 'px',
      'left': this.inFloorMode ? this.room['x'] + 'px' : 0 + 'px',
      'height': this.inFloorMode ? this.room['hoogte'] + 'px' : '',
      'width': this.inFloorMode ? this.room['breedte'] + 'px' : ''
    };
  }

  selectRoom() {
    if (this.room['naam'] !== this.selectedRoom) {
      this.isThisRoomSelected = false;
    }

    this.unselectSubscription = timer(0, 1000).subscribe(t => {
      if (t >= 10) {
        this.isThisRoomSelected = false;
        this.unselectSubscription.unsubscribe();
      }
    });

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
    this.unselectSubscription.unsubscribe();
    console.log('trying to book this many hours:' + this.amountOfHoursBooked);
  }

  // locks reservation ui and updates background color based on timer subscription values
  bookRoom() {
    this.room['bezet'] = true;
    this.bookingTimer();
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

  showDetail() {
    this.router.navigate([`/rooms/${this.room['id']}`]);
  }

  private initRoomColor() {
    if (this.hasSlider() && this.iconStatus['drukte']) {
      this.getColor(this.room['drukte'], this.room['capaciteit']);
    } else if (this.isBookable() && !this.room['bezet']) {
      this.roomColor = 'rgb(0,255,0)';
    }
  }

  // change periodOrScheduler to make it go faster, default should be 1000 == 1s
  private bookingTimer() {
    const maxHours = this.amountOfHoursBooked * 3600;
    console.log('maxhours:' + maxHours);

    let timeObject = new Date();
    timeObject = new Date(timeObject.getTime() + maxHours * 1000);
    console.log('next reservation can be made in:' + timeObject);
    this.nextBooking = timeObject.getHours() + ':' + timeObject.getMinutes() + ':' + timeObject.getSeconds();

    this.reservationSubscription = timer(0, 1000).subscribe(t => {
      this.getColor(t, maxHours);
      if (t >= maxHours) {
        console.log('maxhours reached:' + maxHours);
        this.room['bezet'] = false;
        this.reservationSubscription.unsubscribe();
      }
    });
  }

}
