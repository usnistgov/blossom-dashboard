import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { configure_logingov } from './login-gov';
import buildLoginGovRoutes from './routes/login-gov';
import * as fs from 'fs';
import session from 'express-session';

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const BASE_URL = `${HOST}:${PORT}`;

async function main() {
    const app = express();
    
    app.use(session({
        secret: process.env.SESSION_SECRET || 'identity-oidc-expressjs-secret',
        name: 'identity-oidc-expressjs-session',
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => { done(null, user); });
    passport.deserializeUser((user, done) => {
        done(null, {...(typeof user === 'object' ? user : {})});
    });

    const key = fs.readFileSync('private_rsa.pem', 'ascii');
    const issuer = await configure_logingov(passport, key)
    console.log('OIDC Configured');
    
    app.use(express.static('public'));

    app.use('/auth', buildLoginGovRoutes(passport, issuer, BASE_URL));

    const authenticate = (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }

    app.use('/test', authenticate, (req: Request, res: Response) => {
        res.json(req.user);
    });

    app.listen(PORT, () => {
        console.log(`Server started on ${BASE_URL}`);
    });
}

main();