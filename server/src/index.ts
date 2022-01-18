import express from 'express';
import dotenv from 'dotenv';

import BlossomConfig from './blossom';
import transactionRoute from './routes/transaction';


async function init() {
    // marshall .env into environment variables
    dotenv.config();

    // initialize blossom config class
    await BlossomConfig.getInstance().init(
        process.env.CONNECTION_PROFILE_PATH,
        process.env.CERT_PATH,
        process.env.PK_PATH,
        process.env.MSPID,
        process.env.IDENTITY_UNAME,
        process.env.PRIMARY_CHANNEL,
        process.env.BLOSSOM_CONTRACT,
    );

    const app = express();

    app.use(express.json())

    app.use('/transaction', transactionRoute);

    app.get('/_health', (req, res) => {
        res.status(200).send('ok');
    });

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`server started at http://localhost:${process.env.SERVER_PORT}`);
    });
}

init();
