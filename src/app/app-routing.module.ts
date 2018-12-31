import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

// export const appRoutes: Routes = [
//   {path: 'floors/:id', component: FloorComponent, canActivate: [AuthGuard]}, //
//   {path: 'rooms/:id', component: RoomComponent, canActivate: [AuthGuard], data: {roles: [Role.Personeel]}},   // only personeel can edit rooms
//   {path: 'login', component: LoginComponent},
//   {path: '  ', component: HomeComponent, canActivate: [AuthGuard]},
//   {path: '**', component: HomeComponent, canActivate: [AuthGuard]}
// ];



