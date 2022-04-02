import { PassportStatic } from 'passport';
import {
    Issuer,
    Strategy,
    ClientMetadata,
    AuthorizationParameters,
    BaseClient,
    StrategyVerifyCallbackUserInfo,
    UnknownObject,
} from 'openid-client';
import * as crypto from 'crypto';
import { JWK } from 'node-jose'
import { pem2jwk } from 'pem-jwk';

function randomString(length: number) {
    return crypto.randomBytes(length).toString('hex');
}

const CLIENT_META: ClientMetadata = {
    client_id: 'urn:gov:gsa:openidconnect.profiles:sp:sso:nist:blossom_test',
    token_endpoint_auth_method: 'private_key_jwt',
    id_token_signed_response_alg: 'RS256',
};

const AUTH_PARAMS: AuthorizationParameters = {
    return_type: 'code',
    acr_values: `http://idmanagement.gov/ns/assurance/loa/1`,
    scope: 'openid',
    redirect_uri: `http://localhost:8080/auth/callback`,
    nonce: randomString(32),
    state: randomString(32),
    prompt: 'select_account'
}

export interface UserInfo {
    token?: string;
    state?: string
}

export async function configure_logingov(passport: PassportStatic, rsa_key: string): Promise<Issuer<BaseClient>> {
    const issuer = await Issuer.discover('https://idp.int.identitysandbox.gov');

    const jwk = pem2jwk(rsa_key);
    // const keystore = await JWK.asKeyStore([jwk]);

    const client = new issuer.Client(CLIENT_META, {keys: [jwk] });

    const callback: StrategyVerifyCallbackUserInfo<UserInfo, UnknownObject> = (tokenset, userinfo, done) => {
        console.log("TOKEN SET", tokenset);
        console.log("USER INFO", userinfo);
        done(null, {
            token: tokenset.id_token,
            state: AUTH_PARAMS.state,
            ...userinfo,
        });
    }

    const strategy = new Strategy({ client, params: AUTH_PARAMS }, callback);

    passport.use('login-gov-oidc', strategy);

    return issuer;
}
