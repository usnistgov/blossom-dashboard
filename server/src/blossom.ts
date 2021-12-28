import { Gateway, Wallets, Network, Contract } from 'fabric-network';
import * as fs from 'fs';
import YAML from 'yaml';

export default class BlossomConfig {
    private static instance: BlossomConfig;

    private constructor() { }

    public static getInstance(): BlossomConfig {
        if (!BlossomConfig.instance) {
            BlossomConfig.instance = new BlossomConfig();
        }

        return BlossomConfig.instance;
    }

    private state?: [Gateway, Network, Contract];

    public async init(profile_path: string, cert_path: string, pk_path: string, mspId: string, username: string, primary_channel: string, blossom_contract: string) {
        if (this.state !== undefined) {
            throw new Error('Cannot call init() more then once');
        }

        const profile = YAML.parse(fs.readFileSync(profile_path).toString());

        const identity = {
            credentials: {
                certificate: fs.readFileSync(cert_path).toString(),
                privateKey: fs.readFileSync(pk_path).toString(),
            },
            mspId,
            type: 'X.509',
        }

        const wallet = await Wallets.newInMemoryWallet();
        wallet.put(username, identity);

        const options = {
            identity,
            wallet,
            discovery: {
                // enabled: false,
                asLocalhost: false,
            }
        };

        const gateway = new Gateway();
        await gateway.connect(profile, options);

        const network = await gateway.getNetwork(primary_channel);

        const contract = network.getContract(blossom_contract);

        this.state = [gateway, network, contract];
    }

    public get gateway(): Gateway {
        if (this.state === undefined) {
            throw new Error('Must call init() first');
        }
        return this.state[0];
    }

    public get network(): Network {
        if (this.state === undefined) {
            throw new Error('Must call init() first');
        }
        return this.state[1];
    }

    public get contract(): Contract {
        if (this.state === undefined) {
            throw new Error('Must call init() first');
        }
        return this.state[2];
    }
}
