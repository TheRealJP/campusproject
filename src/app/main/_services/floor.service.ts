import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Floor} from '../_models/floor';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
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


  fetchRoomsByFloor(id: number): Observable<Floor> {
    return this.http.get<Floor>(`${this.baseUrl}/floors/${id}/rooms`).pipe(
      tap(() => log('fetched floor' + id))
    );
  }

}
