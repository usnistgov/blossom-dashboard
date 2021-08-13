import express from 'express';
import dotenv from 'dotenv';

import BlossomConfig from './blossom';
import rawTransactionRoute from './routes/raw-transaction';


async function init() {
    // marshall .env into environment variables
    dotenv.config();

    // initialize blossom config class
    await BlossomConfig.getInstance().init(
        process.env.CONNECTION_PROFILE_PATH,
        process.env.WALLET_PATH,
        process.env.IDENTITY_UNAME,
        process.env.PRIMARY_CHANNEL,
        process.env.BLOSSOM_CONTRACT,
    );

    const app = express();

    app.use(express.json())

    app.use('/raw', rawTransactionRoute);

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`server started at http://localhost:${process.env.SERVER_PORT}`);
    });
}

init();
