import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {appRoutes, AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTabsModule,
  MatSliderModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatCardModule,
  MatBadgeModule,
  MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule
} from '@angular/material';
import { LoginComponent } from './security/login/login.component';
import { FloorComponent } from './main/floor/floor.component';
import { RoomComponent } from './main/room/room.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FloorcontainerComponent } from './main/floorcontainer/floorcontainer.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { HomeComponent } from './main/home/home.component';
import { RoomDetailComponent } from './main/room-detail/room-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FloorComponent,
    RoomComponent,
    FloorcontainerComponent,
    HomeComponent,
    RoomDetailComponent
  ],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatSliderModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
