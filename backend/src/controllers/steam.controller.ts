import { environment } from 'environments/environment';
import { Request, Response, Router } from 'express';
import { Logger } from '../helpers/logger';
import axios from 'axios';

const STEAM_API_KEY = '';

export default class SteamController {
  public baseURL: string;
  public router: Router;
  logger: Logger;

  constructor() {
    this.logger = new Logger('STEAM');
    this.baseURL = '/steam';
    this.router = Router();

    this.initRoutes();

    this.logger.success(`Controller initialized`);
  }

  initRoutes() {
    this.router.get('/test', this.testAPI);
    this.router.get('/games/:steamId', this.getOwnedGamesForSteamID);
    this.router.get('/resolveVanityURL/:vanityURL', this.resolveVanityURL);
  }

  async testAPI(req: Request, res: Response) {
    try {
      res.send('test');
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getOwnedGamesForSteamID(req: Request, res: Response) {
    try {
      const steamID = req.params.steamId;

      const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001`;
      const params = {
        key: STEAM_API_KEY,
        steamid: steamID,
        format: 'json',
        include_appinfo: true
      }

      const response = await axios.get(url, { params });
      const data = response.data;

      res.send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async resolveVanityURL(req: Request, res: Response) {
    try {
      const vanityURL = req.params.vanityURL;

      const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001`;
      const params = {
        key: STEAM_API_KEY,
        vanityurl: vanityURL,
        format: 'json'
      }

      const response = await axios.get(url, { params });
      const data = response.data;

      res.send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
