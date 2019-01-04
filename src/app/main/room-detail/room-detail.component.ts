import {Component, OnInit} from '@angular/core';
import {FloorService} from '../_services/floor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../_models/room';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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

  constructor(private floorService: FloorService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    /**
     initialize reactive form, taking in consideration we need to wait for room to be fetched async
     we do a second fetch to fill in the class variable this.room
     */

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.updateRoomForm = this.formBuilder.group({
      name: new FormControl({value: ''}, [Validators.required, Validators.minLength(5)]) /*['', [Validators.required, Validators.minLength(5)]]*/,
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

    // update room values from form
    this.room['name'] = this.updateRoomForm.value['name'];
    this.room['type'] = this.updateRoomForm.value['type'];
    this.room['capaciteit'] = this.updateRoomForm.value['capaciteit'];
    this.room['bezet'] = this.updateRoomForm.value['bezet'];
    this.room['drukte'] = this.updateRoomForm.value['drukte'];
    this.room['beamer'] = this.updateRoomForm.value['beamer'];

    this.floorService.updateRoom(this.room).subscribe(value => {
      console.log(value);
    });

    this.router.navigate([`/floors/${this.room['id'].charAt(0)}`]);
  }
}



