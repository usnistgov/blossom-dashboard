import { Gateway,  Wallets } from 'fabric-network';
import * as fs from 'fs';
import express from 'express';

const IDENTITY_UNAME = 'Org1 CA Admin';
const WALLET_PATH = 'Org1';
const PRIMARY_CHANNEL = 'mychannel';
const BLOSSOM_CONTRACT = 'blossom-14';

const profile = JSON.parse(fs.readFileSync('Test14Org1GatewayConnection.json'));

const options = {
    identity: IDENTITY_UNAME,
    wallet: await Wallets.newFileSystemWallet(WALLET_PATH)
}

const gateway = new Gateway();
await gateway.connect(profile, options);

const network = await gateway.getNetwork(PRIMARY_CHANNEL);
// could also get contract from gateway directly
const blossom_contract = network.getContract(BLOSSOM_CONTRACT);

const app = express();

app.get('/test', async (_, res) => {
    const tRes = await blossom_contract.submitTransaction('Agencies');
    res.send(tRes);
})

app.listen(8080);
