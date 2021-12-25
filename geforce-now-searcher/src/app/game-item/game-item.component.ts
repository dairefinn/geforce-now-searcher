import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EGameStore } from 'src/shared/models/game-store.model';
import { PageGame } from '../app.component';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {
  @Input() game: PageGame;

  constructor(
    private router: Router
  ) {
    this.game = undefined!;
  }

  ngOnInit(): void {
  }

  openGameStorePage(): void {
    switch (this.game.store) {
      case EGameStore.STEAM:
        window.open(this.game.steamUrl, '_blank');
        break;
      case EGameStore.EPIC:
        // alert('')
        // window.open(this.game.steamUrl, '_blank');
      default: 
        console.log('Unsupported store navigation: ', this.game.store);
    }
  }
}
