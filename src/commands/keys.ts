import { Command, Flags } from '@oclif/core';
import * as rs from 'jsrsasign';
const rsu = require('jsrsasign-util');
// TODO implementar https://www.npmjs.com/package/node-forge#rsa

export default class Key extends Command
{
    static description = 'Generate private key and public key';

    static flags = {
        help: Flags.help({ char: 'h' }),
    };

    static examples = [
        '$ aurora keys',
        '$ aurora --help',
    ]

    public async run(): Promise<void>
    {
        const { prvKeyObj, pubKeyObj } = rs.KEYUTIL.generateKeypair('RSA', 2048);

        const prvPEM = rs.KEYUTIL.getPEM(prvKeyObj, 'PKCS1PRV');
        const pubPEM = rs.KEYUTIL.getPEM(pubKeyObj);

        rsu.saveFile('oauth-private.key', prvPEM);
        rsu.saveFile('oauth-public.key', pubPEM);

        this.log('Private key saved in oauth-private.key and public key saved in oauth-public.key');
    }
}
