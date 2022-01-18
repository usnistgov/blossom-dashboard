import express from 'express';
import * as fs from 'fs';
import { Command } from 'commander';
import YAML from 'yaml';
import Blossom from './blossom';
import buildTransactionRoute from './routes/transaction';
import buildIdentityRoute from './routes/indentities';
import { Config } from './config';

function mapRoutes(blossom: Blossom, port: string) {
    const app = express();

    // Enable JSON serialization
    app.use(express.json())

    app.use('/transaction', buildTransactionRoute(blossom));
    app.use('/identity', buildIdentityRoute(blossom));

    app.get('/_health', (_, res) => {
        res.status(200).send('ok');
    });

    app.listen(port, () => {
        console.log(`server started at http://0.0.0.0:${port}`);
    });
}

const program = new Command()
    .version('0.0.1')
    .description('BLOSSOM Relay Server')
    .argument('<configPath>', 'config yaml file')
    .option('-p --port', 'Port to run the server on', "8080")
    .action(async (configPath, options) => {
        const config = (YAML.parse(fs.readFileSync(configPath).toString())) as Config;
        const blossom = await Blossom.build(config as Config);
        
        mapRoutes(blossom, options.port);
    });

program.parse(process.argv);
