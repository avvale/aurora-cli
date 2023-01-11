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

    static args = [];

    async run(): Promise<void>
    {
        const { args, flags } = await this.parse(Key);

        const { prvKeyObj, pubKeyObj } = rs.KEYUTIL.generateKeypair('RSA', 2048);

        const prvPEM = rs.KEYUTIL.getPEM(prvKeyObj, 'PKCS1PRV');
        const pubPEM = rs.KEYUTIL.getPEM(pubKeyObj);

        rsu.saveFile('oauth-private.key', prvPEM);
        rsu.saveFile('oauth-public.key', pubPEM);
    }
}
