export interface Config {
    connectionProfilePath: string;
    channel: string;
    contract: string;
    endorsingOrganizations?: string[];
    identities: Identity[];
}

export interface Identity {
    name: string;
    mspId: string;
    certPath: string;
    privateKeyPath: string;
    listenToEvents?: boolean;
};
