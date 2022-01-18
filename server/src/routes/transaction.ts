import { Router, Request } from 'express';
import BlossomConfig from '../blossom'

const blossom = BlossomConfig.getInstance();

const router = Router();
export default router;

type TransactionRequestBody = {
    name: string;
    args: string[];
    transient?: {
        [key: string]: string;
    };
}

/**
 * Convert string-buffer map to string-string
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

router.post('/query', (req: Request<{}, {}, TransactionRequestBody>, res, next) => {
    const transaction = blossom.contract.createTransaction(req.body.name);
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
    const transaction = blossom.contract.createTransaction(req.body.name);
    if (req.body.transient) {
        transaction.setTransient(convertTransientToBuffer(req.body.transient))
    }

    transaction.evaluate(...req.body.args).then((buff) => {
        res.send(buff);
    }, (err) => {
        next(err);
    });
});
