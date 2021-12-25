import { Component, OnInit } from '@angular/core';
import { IGame } from 'src/shared/models/game.model';
import { FormControl } from '@angular/forms';
import { EGameStore } from 'src/shared/models/game-store.model';
import { SteamService } from 'src/shared/services/steam.service';

import gamesData from 'src/assets/response.json';
import steamGamesData from 'src/assets/steam-api.json';
import { ISteamGame } from 'src/shared/models/steam-game.model';

export interface PageGame extends IGame {
  steamAppId: number;
  imageURL: string;
  steamGame?: ISteamGame;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public readonly eGameStore = EGameStore;

  gamesList: PageGame[];
  gamesListFiltered: PageGame[];

  searchControl: FormControl;
  storeControl: FormControl;
  ownedControl: FormControl;
  steamURLControl: FormControl;

  steamGames: ISteamGame[];

  constructor(
    private steamService: SteamService
  ) {
    this.gamesList = [];
    this.gamesListFiltered = [];
    this.steamGames = [];

    this.searchControl = new FormControl('', []);
    this.storeControl = new FormControl(null, []);
    this.ownedControl = new FormControl(false, []);
    // this.steamURLControl = new FormControl('76561197978456897', []);
    this.steamURLControl = new FormControl('dman355', []);
    this.fetchSteamGamesForUser();
  }

  ngOnInit(): void {
    this.initEventListeners();
  }

  initEventListeners(): void {
    this.searchControl.valueChanges.subscribe((sarg: string) => this.updateData(sarg, undefined, undefined));
    this.storeControl.valueChanges.subscribe((stores: EGameStore[]) => this.updateData(undefined, stores, undefined));
    this.ownedControl.valueChanges.subscribe((owned: boolean) => this.updateData(undefined, undefined, owned));
    // this.steamURLControl.valueChanges.subscribe((owned: boolean) => this.updateData(undefined, undefined, owned));
  }

  updateData(sarg?: string, stores?: EGameStore[], owned?: boolean): void {
    if (!sarg) {
      sarg = this.searchControl.value as string;
    }

    if (!stores) {
      stores = this.storeControl.value as EGameStore[];
    }

    if (!owned) {
      owned = false;
    }

    let games = this.gamesList;
    games = this.doSearch(sarg, games);
    games = this.filterByStore(stores, games);
    games = this.filterByOwnedGames(owned, games);
    this.gamesListFiltered = games;
  }

  doSearch(sarg: string, data: PageGame[]): PageGame[] {
    if (!sarg) {
      return data;
    }

    return data.filter(d => {
      return d.title.includes(sarg);
    });
  }

  filterByStore(storesSelected: EGameStore[], data: PageGame[]): PageGame[] {
    if (!storesSelected) {
      return data;
    }

    return data.filter(d => {
      return storesSelected.includes(d.store);
    })
  }

  filterByOwnedGames(owned: boolean, data: PageGame[]): PageGame[] {
    if (!owned) {
      return data;
    }

    return this.getMatchesBetweenGeforceAndSteam(data, this.steamGames.map(g => g.appid));
  }

  getSteamIDFromVanityURL(vanityURL: string) {
    return this.steamService.resolveVanityURL(vanityURL).toPromise();
  }

  getOwnedSteamGames(steamID: string): Promise<any> {
    return this.steamService.getOwnedGames(steamID).toPromise()
  }

  getMatchesBetweenGeforceAndSteam(games: PageGame[], steamAppIds: number[]): PageGame[] {
    return games.filter(g => {
      if (g.steamUrl) {
        const appId = this.parseSteamUrlToAppId(g.steamUrl);

        if (steamAppIds.includes(appId)) {
          return true;
        }
      }

      return false;
    })
    .filter(g => g);
  }

  parseSteamUrlToAppId(url: string): number {
    if (!url) {
      return -1;
    }

    const splitSlash = url.split('/');
    const appId = Number(splitSlash[4]);
    return appId;
  }

  parseGamesMultiple(games: PageGame[]): PageGame[] {
    return games.map(g => this.parseGameSingle(g));
  }

  parseGameSingle(game: PageGame): PageGame {
    const output = game as PageGame;

    if (output) {
      output.steamAppId = this.parseSteamUrlToAppId(game.steamUrl);
      output.steamGame = this.getSteamGameById(output.steamAppId);
      output.imageURL = this.getImageUrlForGame(output.steamGame);
    }

    return output;
  }

  getSteamGameById(appId: number): (ISteamGame | undefined) {
    if (!appId) {
      return undefined;
    }

    return this.steamGames.find(g => g.appid === appId);
  }

  getImageUrlForGame(steamGame?: ISteamGame): string {
    if (!steamGame) {
      return '';
    }
  
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${steamGame.appid}/header.jpg`;

    // console.info(steamGame.img_icon_url, steamGame.img_logo_url)
    // if (steamGame.img_logo_url) {
    //   return `http://media.steampowered.com/steamcommunity/public/images/apps/${steamGame.appid}/${steamGame.img_logo_url}.jpg`;
    // }

    // if (steamGame.img_logo_url) {
    //   return `http://media.steampowered.com/steamcommunity/public/images/apps/${steamGame.appid}/${steamGame.img_icon_url}.jpg`;
    // }

    return '';
  }

  fetchSteamGamesForUser() {
    this.getSteamIDFromVanityURL(this.steamURLControl.value).then(vanityResolved => {
      this.getOwnedSteamGames(vanityResolved.response.steamid!).then(res => {
        this.steamGames = res.response.games as ISteamGame[];
        const gameDataParsed = this.parseGamesMultiple(gamesData);
        this.gamesList = gameDataParsed;
        this.gamesListFiltered = gameDataParsed;
      });
    })
  }
}
