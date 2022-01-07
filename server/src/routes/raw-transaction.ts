import { Router, Request, Response } from 'express';
import BlossomConfig from '../blossom'

const blossom = BlossomConfig.getInstance();

const router = Router();
export default router;

type TransactionRequestBody = {
    name: string;
    params: string[];
}

router.post('/transaction', async (req: Request<{}, {}, TransactionRequestBody>, res: Response) => {
    const transactionResponse = await blossom.contract.submitTransaction(req.body.name, ...req.body.params);
    res.send(transactionResponse);
});
