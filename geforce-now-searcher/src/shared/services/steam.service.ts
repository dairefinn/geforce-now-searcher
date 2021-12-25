import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISteamGame } from '../models/steam-game.model';

interface GetOwnedGamesResponse {
  response: {
    game_count: number;
    games: ISteamGame[]
  }
}

interface ResolveVanityURLResponse {
  response: {
    success: any;
    steamid?: string;
    message?: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SteamService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getOwnedGames(steamID: string): Observable<GetOwnedGamesResponse> {
    const url =`${environment.API_URL}/steam/games/${steamID}`;
    return this.httpClient.get<GetOwnedGamesResponse>(url);
  }

  resolveVanityURL(vanityURL: string): Observable<ResolveVanityURLResponse> {
    const url =`${environment.API_URL}/steam/resolveVanityURL/${vanityURL}`;
    return this.httpClient.get<ResolveVanityURLResponse>(url);
  }
}
