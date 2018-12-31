import {Component} from '@angular/core';
import {User} from './security/_models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './security/_services/authentication.service';
import {Role} from './security/_models/role.enum';
import {FloorService} from './main/_services/floor.service';
import {Floor} from './main/_models/floor';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'campusproject';
  currentUser: User;
  floors: Floor[] = [];

  constructor(private router: Router, private authService: AuthenticationService, private floorService: FloorService) {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.currentUser = user[0]; // array format, so we have to filter it out like this
      }
    }, error => console.log(error));

    floorService.fetchFloors().subscribe((f) => this.floors = f);
    floorService.fetchFloors().pipe(map((f) => {
        this.floors = f;
        return f;
      }
    ),)
    ;
  }


  get isPersoneel() {
    return this.currentUser && this.currentUser.role === Role.Personeel;
  }

  logout() {
    this.currentUser = null;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
