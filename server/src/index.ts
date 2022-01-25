import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ws from 'ws';
import * as fs from 'fs';
import { Command } from 'commander';
import YAML from 'yaml';
import path from 'path';

import Blossom from './blossom';
import buildTransactionRoute from './routes/transaction';
import buildIdentityRoute from './routes/indentities';
import { Config } from './config';

function mapRoutes(blossom: Blossom, port: string, staticPath?: string, corsOrigin='*') {
    const app = express();

    // Enable JSON serialization
    app.use(express.json())

    // JSON error response
    app.use((err: unknown, _: Request, res: Response, __: NextFunction) => {
        res.status(500).send({ error: err });
    });

    app.use(cors({
        origin: corsOrigin,
        optionsSuccessStatus: 200,
    }));

    // transaction and identity routes
    app.use('/transaction', buildTransactionRoute(blossom));
    app.use('/identity', buildIdentityRoute(blossom));

    app.get('/_health', (_, res) => {
        res.status(200).send('ok');
    });

    // if (staticPath) {
    //     app.use(express.static(staticPath));
    //     app.use(express.static("public"));
    // }

    const server = app.listen(port, () => {
        console.log(`server started at http://0.0.0.0:${port}`);
    });

    // set up websocket server
    const wsServer = new ws.Server({ noServer: true });

    server.on('upgrade', (req, socket, head) => {
        console.log('New websocket connection');
        wsServer.handleUpgrade(req, socket, head, (client, req) => {
            client.emit('connection', socket, req);
        });
    });

    server.on('ping', () => {
        console.log('New client ping');
        wsServer.emit('pong');
    });

    blossom.assignContractListener(async (event) => {
        console.log(event);
        wsServer.emit('contract_event', event);
    });
}

const program = new Command()
    .version('0.0.1')
    .description('BLOSSOM Relay Server')
    .argument('<configPath>', 'config yaml file')
    .option('-p --port [port]', 'Port to run the server on', "8080")
    .option('--static', 'Serve static page at the following path')
    .action(async (configPath, options) => {
        const config = (YAML.parse(fs.readFileSync(configPath).toString())) as Config;
        const blossom = await Blossom.build(config as Config);
        
        mapRoutes(blossom, options.port, options.static);
    });

program.parse(process.argv);
