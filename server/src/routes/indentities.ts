import { Router } from 'express';
import Blossom from '../blossom';

export default function buildIdentityRoute(blossom: Blossom): Router {
    const router = Router();

    /**
    * Get all identities route
    */
    router.get('', (_, res) => {
        res.json(blossom.getIdentities());
    });

    return router;
}
