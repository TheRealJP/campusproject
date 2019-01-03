import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../_models/room';
import {Type} from '../_models/type.enum';
import {Subscription, timer} from 'rxjs';
import {RoomIconStatus} from '../_models/roomiconstatus';
import {Router} from '@angular/router';
import {RoomService} from '../_services/room.service';

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
  isThisRoomSelected: boolean;
  amountOfHoursBooked: number;
  roomColor = 'rgb(255,255,255)';

  private reservationSubscription: Subscription;
  private unselectSubscription: Subscription;

  constructor(private router: Router, private roomService: RoomService) {
  }


  ngOnInit() {
    this.initRoomColor();
    this.amountOfHoursBooked = 1;
  }

  //  todo:deselect room when selecting another
  selectRoom() {

    if (this.room['naam'] !== this.selectedRoom) {
      this.isThisRoomSelected = false;
    }

    this.unselectSubscription = timer(0, 1000).subscribe(t => {
      console.log(t);
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
    timeObject = new Date(timeObject.getTime() + maxHours * 10);
    console.log('next reservation can be made in:' + timeObject);

    this.reservationSubscription = timer(0, 1000).subscribe(t => {
      this.getColor(t, maxHours);
      if (t >= maxHours) {
        console.log('maxhours reached:' + maxHours);
        this.room['bezet'] = false;
        this.reservationSubscription.unsubscribe();
      }
    });
  }

  showDetail() {
    this.router.navigate([`/rooms/${this.room['id']}`]);
  }
}
