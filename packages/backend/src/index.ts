import express, { Request, Response } from 'express';

const app = express();
const port = 8080;

const returnURL: { [key: string]: string } = {};

app.get('/', (req: Request, res: Response) => {
    res.send('BACKEND OK');
});

app.listen(port, () => {
    console.log('ONLINE');
});