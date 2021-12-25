import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameItemComponent } from './game-item/game-item.component';
import { SteamService } from 'src/shared/services/steam.service';

@NgModule({
  declarations: [
    AppComponent,
    GameItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    SteamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
