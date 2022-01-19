import { Router, Request } from 'express';
import Blossom from '../blossom';

type TransactionRequestBody = {
    name: string;
    args: string[];
    transient?: {
        [key: string]: string;
    };
    identity: string;
}

/**
 * Convert string-string map to string-buffer
 */
function convertTransientToBuffer(transient: {
    [key: string]: string;
}) {
    return Object.keys(transient).reduce<{
        [key: string]: Buffer;
    }>((acc, key) => {
        acc[key] = Buffer.from(transient[key]);
        return acc;
    }, {})
}

export default function buildTransactionRoute(blossom: Blossom) {
    const router = Router();

    router.post('/query', (req: Request<{}, {}, TransactionRequestBody>, res, next) => {
        const transaction = blossom.getContractForIdentity(req.body.identity).createTransaction(req.body.name);
        if (req.body.transient) {
            transaction.setTransient(convertTransientToBuffer(req.body.transient))
        }
    
        transaction.submit(...req.body.args).then((buff) => {
            res.send(buff);
        }, (err) => {
            next(err);
        });
    });
    
    router.post('/invoke', (req: Request<{}, {}, TransactionRequestBody>, res, next) => {
        const transaction = blossom.getContractForIdentity(req.body.identity).createTransaction(req.body.name);
        if (req.body.transient) {
            transaction.setTransient(convertTransientToBuffer(req.body.transient))
        }
    
        transaction.evaluate(...req.body.args).then((buff) => {
            res.send(buff);
        }, (err) => {
            next(err);
        });
    });

    return router;
}

