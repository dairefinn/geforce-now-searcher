import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import controllers from './controllers/controllers';
import http from 'http';;

export class App {
    private app: express.Application;
    private server: http.Server;

    constructor() {
        this.app = express();
        this.configApp();
    }

    private configApp() {
        // BodyParser config
        this.app.use(json({
            limit: '50mb'
        }));
        this.app.use(urlencoded({
            limit: '50mb',
            extended: true
        }));

        // CookieParser config
        this.app.use(cookieParser());

        // Cors config
        this.app.use(cors());

        // Default headers
        this.app.use((req, res, next) => {
            res.setHeader("Content-Security-Policy", "default-src 'self'; img-src https://*; child-src 'none';")
            next();
        })

        // Set routes
        this.initControllers();

        // Config HTTP
        this.server = http.createServer(this.app);
    }

    private initControllers() {
        this.app.get('', (req, res) => {
            res.send('API Works')
        })

        controllers.forEach(c => {
            this.app.use(c.baseURL, c.router);
        })
    }

    public start(port: number) {
        this.server.listen(port, () => {
            console.log(`\x1b[36mBackend \x1b[0mrunning on port \x1b[33m${port}`);
        })
    }
}
