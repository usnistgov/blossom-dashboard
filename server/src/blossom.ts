import { Gateway, Wallets, Network, Contract, ContractListener } from 'fabric-network';
import * as fs from 'fs';
import YAML from 'yaml';
import { Config, Identity as IdentityConfig } from './config';

async function connectWithIdentity(profile: any, channel: string, identityConfig: IdentityConfig) {
    const identity = {
        credentials: {
            certificate: fs.readFileSync(identityConfig.certPath).toString(),
            privateKey: fs.readFileSync(identityConfig.privateKeyPath).toString(),
        },
        mspId: identityConfig.mspId,
        type: 'X.509',
    }
    const wallet = await Wallets.newInMemoryWallet();
    wallet.put(identityConfig.name, identity);

    const options = {
        identity,
        wallet,
        discovery: {
            asLocalhost: false,
        }
    }

    const gateway = new Gateway();
    await gateway.connect(profile, options);

    const network = await gateway.getNetwork(channel);
    return network;
}

type IdentityMap = {
    [username: string]: {
        mspId: string;
        network: Network;
    };
};

export default class Blossom {
    private contractName: string;
    private identities: IdentityMap;
    private endorsingOrgs: string[] | undefined;
    private listeningClient: string;

    private constructor(contractName: string, identities: IdentityMap, listeningClient: string, endorsingOrgs?: string[]) {
        this.contractName = contractName;
        this.identities = identities;
        this.endorsingOrgs = endorsingOrgs;
        this.listeningClient = listeningClient;
    }

    public getIdentities(): {name: string, mspId: string}[] {
        return Object.keys(this.identities).map((name) => ({
            name,
            mspId: this.identities[name].mspId
        }));
    }

    public getEndorsingOrgs(): string[] | undefined {
        return this.endorsingOrgs;
    }

    public getContractForIdentity(identity: string): Contract {   
        return this.identities[identity].network.getContract(this.contractName);
    }

    public getListeningIdentityContract(): Contract {
        return this.identities[this.listeningClient].network.getContract(this.contractName);
    }

    public static async build(config: Config): Promise<Blossom> {
        const profile = YAML.parse(fs.readFileSync(config.connectionProfilePath).toString());

        const identityMap: IdentityMap = {};

        for (const identityConfig of config.identities) {
            if (identityMap[identityConfig.name]) {
                throw new Error(`Identity name clash, ${identityConfig.name} defined twice`);
            }

            identityMap[identityConfig.name] = {
                mspId: identityConfig.mspId,
                network: await connectWithIdentity(profile, config.channel, identityConfig),
            }
        }

        return new Blossom(config.contract, identityMap, config.listeningClient, config.endorsingOrganizations);
    }
}
