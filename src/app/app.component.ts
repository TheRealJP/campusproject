import { Component } from '@angular/core';
import {Floor} from './main/_models/floor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'campusproject';
  floors: Floor[];
}
