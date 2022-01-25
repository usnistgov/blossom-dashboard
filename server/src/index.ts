import express, { NextFunction, Request, Response } from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import * as fs from 'fs';
import { Command } from 'commander';
import YAML from 'yaml';

import Blossom from './blossom';
import buildTransactionRoute from './routes/transaction';
import buildIdentityRoute from './routes/indentities';
import { Config } from './config';
import path from 'path';

function mapRoutes(blossom: Blossom, port: string, staticPath?: string, corsOrigin='*') {
    const { app } = expressWs(express());

    // Enable JSON serialization
    app.use(express.json())

    app.use(cors({
        origin: corsOrigin,
        optionsSuccessStatus: 200,
    }));

    app.ws('/', (ws, req) => {
        ws.on('message', (msg) => {
            console.log(msg);
            ws.send('pong');
        });

        blossom.assignContractListener(async (event) => {
            console.log(event);
            ws.send({'contract_event': event});
        });

        console.log('new websocket connection from ', req.ip);
    });

    // transaction and identity routes
    app.use('/transaction', buildTransactionRoute(blossom));
    app.use('/identity', buildIdentityRoute(blossom));

    app.get('/_health', (_, res) => {
        res.status(200).send('ok');
    });

    app.get('/test', (_, res) => {
        throw new Error('Test error');
    });

    // JSON error response
    app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
        console.log(err)
        res.status(500).send({ 
            error: err.name,
            message: err.message,
            stack: err.stack,
        });
    });

    if (staticPath) {
        app.use(express.static(staticPath));
        app.get('*', (_, res) => res.sendFile(path.resolve(staticPath, 'index.html')));
    }

    app.listen(port, () => {
        console.log(`server started at http://0.0.0.0:${port}`);
    });
}

const program = new Command()
    .version('0.0.1')
    .description('BLOSSOM Relay Server')
    .argument('<configPath>', 'config yaml file')
    .option('-p --port [port]', 'Port to run the server on', "8080")
    .option('--static [staic]', 'Serve static page at the following path')
    .action(async (configPath, options) => {
        const config = (YAML.parse(fs.readFileSync(configPath).toString())) as Config;
        const blossom = await Blossom.build(config as Config);
        
        mapRoutes(blossom, options.port, options.static);
    });

program.parse(process.argv);
