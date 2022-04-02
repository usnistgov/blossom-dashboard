import { Router } from 'express';
import { BaseClient, Issuer } from 'openid-client';
import { PassportStatic } from 'passport';
import { UserInfo } from '../login-gov';

export default function buildLoginGovRoutes(passport: PassportStatic, issuer: Issuer<BaseClient>, baseUrl: string) {
    const router = Router();

    router.get('/login', passport.authenticate('login-gov-oidc'));

    router.get('/callback', passport.authenticate('login-gov-oidc', {
        successRedirect: '/',
        failureMessage: 'failed :/',
    }));

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    router.get('/oidc-logout', (req, res) => {
        if (req.user) {
            const user = req.user as UserInfo;
            res.redirect(`${issuer.metadata.end_session_endpoint}?id_token_hint=${user.token}&post_logout_redirect_uri=${baseUrl}/auth/logout&state=${user.state}`);
        } else {
            req.logout();
            res.redirect('/');
        }
    });

    return router;
}