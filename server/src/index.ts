import express from 'express';
import * as fs from 'fs';
import { Command } from 'commander';
import Blossom from './blossom';
import transactionRoute from './routes/transaction';
import buildIdentityRoute from './routes/indentities';
import { Config } from './config';

interface Options {
    /**
     * Path to config yaml file
     */
    config: string;
}

function parseArgs() {
    const args = new Command()
        .version('0.0.1')
        .description('BLOSSOM Relay Server')
        .argument('<config>', 'config yaml file')
        .parse(process.argv);

    return args as unknown as Options;
}

async function init() {
    const options = parseArgs();
    const config = JSON.parse(fs.readFileSync(options.config).toString());
    
    const blossom = await Blossom.build(config as Config)

    const app = express();

    // Enable JSON serialization
    app.use(express.json())

    app.use('/transaction', transactionRoute);
    app.use('/identity', buildIdentityRoute(blossom));

    app.get('/_health', (_, res) => {
        res.status(200).send('ok');
    });

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`server started at http://localhost:${process.env.SERVER_PORT}`);
    });
}

init();
