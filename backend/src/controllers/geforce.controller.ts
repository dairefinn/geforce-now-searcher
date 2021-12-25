import { Request, Response, Router } from 'express';
import { Logger } from '../helpers/logger';

export default class CardsController {
  public baseURL: string;
  public router: Router;
  logger: Logger;

  constructor() {
    this.logger = new Logger('CARDS');
    this.baseURL = '/cards';
    this.router = Router();

    this.initRoutes();
  }

  initRoutes() {
    // TODO:
  }
}
