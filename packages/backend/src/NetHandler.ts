import chalk from 'chalk';
import express, { Request, Response, Router } from 'express';
import {Logger} from '@lucemans/logger';

export default class NetHandler extends Logger {

    constructor() {
        super(chalk.blue('NET'));

        const app = express();
        const port = 8080;

        app.get('/', (req: Request, res: Response) => {
            this.info('Healthcheck /');
            res.send('BACKEND OK');
        });

        const projects = Router();
        projects.use(secure);
        app.use(projects);

        projects.get('/projects', async (req: Request, res: Response) => {
            this.info('Projects Query');
            const thing = [];


            res.send()
        });


        app.listen(port, () => {
            this.info('Application Launched')
        });
    }
}

export function secure(req: Request, res: Response, next) {
    if (!!!req.headers.authorization) {
        res.status(403);
        res.send('No Authorization Header Present');
        this.dumb('Auth Dismissed');
        return;
    }

    try {
        next();
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send();
    }
}