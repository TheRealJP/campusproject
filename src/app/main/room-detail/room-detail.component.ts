import {Component, OnInit} from '@angular/core';
import {FloorService} from '../_services/floor.service';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../_models/room';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  room: Room;
  updateRoomForm: FormGroup;
  private submitted: boolean;
  private roomObservable: Observable<Room>;


  constructor(private floorService: FloorService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.updateRoomForm = this.formBuilder.group({
      id: [{value: '', hidden: true}],
      name: ['', [Validators.required, Validators.minLength(5)]],
      capaciteit: ['', [Validators.required, Validators.max(500)]],
      type: ['', [Validators.required]],
      beamer: '',
      drukte: '',
      bezet: ''
    });

    this.roomObservable = this.floorService.fetchRoomById(id).pipe(
      tap(room => this.updateRoomForm.patchValue(room))
    ).pipe(
      tap(room => this.room = room)
    );
  }

  get f() {
    return this.updateRoomForm.controls;
  }

  submitRoom() {
    this.submitted = true;
    if (this.updateRoomForm.invalid) {
      return;
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.updateRoomForm.value));

    this.floorService.updateRoom(this.room).subscribe(value => {
      console.log(value);
    });
  }
}



