import {Component} from '@angular/core';
import {Floor} from './main/_models/floor';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'campusproject';
  floors: Floor[] = [
    {floorLevel: 1, rooms: []},
    {floorLevel: 2, rooms: []},
    {floorLevel: 3, rooms: []}
  ];


  fetchFloors(): Observable<Floor[]> {
    return;
  }

}
