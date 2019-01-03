import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Floor} from '../_models/floor';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {log} from 'util';
import {Room} from '../_models/room';
import {Type} from '../_models/type.enum';

@Injectable({
  providedIn: 'root'
})
// todo: make a fetchcount to lessen data load
export class FloorService {
  baseUrl = 'http://localhost:3000/api';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }


  fetchFloors(): Observable<Floor[]> {
    return this.http.get<Floor[]>(`${this.baseUrl}/floors`).pipe(
      tap(() => log('fetched floors'))
    );
  }

  fetchFloor(id: number): Observable<Floor> {
    return this.http.get<Floor>(`${this.baseUrl}/floors/${id}`, {headers: this.headers}).pipe(
      tap(() => console.log('(floor-service): fetched floor ' + id))
    );
  }


  fetchRoomById(roomid: string): Observable<Room> {
      return this.http.get<Room>(`${this.baseUrl}/floors/${roomid.charAt(0)}/rooms/${roomid}`).pipe(
        tap(() => log('fetched floor' + roomid.charAt(0) + ' room:' + roomid))
      );
  }

  updateRoom(r: Room) {
    console.log(r['id']);
    return this.http.put(`${this.baseUrl}/rooms/"${r['id']}"`, {r}).pipe(
      tap((result) => log('updated room' + result)));
  }

  hasSlider(room: Room) {

  }

  isBookable(room: Room): boolean {
    return room['type'] === Type.klaslokaal
      || room['type'] === Type.aula
      || room['type'] === Type.vergaderzaal;
  }

}
