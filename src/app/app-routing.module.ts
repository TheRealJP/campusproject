import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FloorComponent} from './main/floor/floor.component';
import {AuthGuard} from './security/_guards/auth.guard';
import {RoomComponent} from './main/room/room.component';
import {LoginComponent} from './security/login/login.component';
import {FloorcontainerComponent} from './main/floorcontainer/floorcontainer.component';
import {HomeComponent} from './main/home/home.component';
import {RoomDetailComponent} from './main/room-detail/room-detail.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const appRoutes: Routes = [
  {path: 'floors/:id', component: FloorcontainerComponent, canActivate: [AuthGuard]},
  {path: 'rooms/:id', component: RoomDetailComponent, canActivate: [AuthGuard]/*, data: {roles: [Role.Personeel]}*/},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '  ', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent, canActivate: [AuthGuard]}
];



