export interface Config {
    connectionProfilePath: string;
    channel: string;
    contract: string;
    identities: Identity[];
}

export interface Identity {
    name: string;
    mspId: string;
    certPath: string;
    privateKeyPath: string;
};
