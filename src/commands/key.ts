import { Command, flags } from '@oclif/command'
import * as rs from 'jsrsasign';
const rsu = require('jsrsasign-util');

export default class Key extends Command
{
    static description = 'Generate private key and public key';

    static flags = {
        help: flags.help({ char: 'h' })
    };

    static args = [];

    async run(): Promise<void>
    {
        const { args, flags } = this.parse(Key);

        const { prvKeyObj, pubKeyObj } = rs.KEYUTIL.generateKeypair('RSA', 2048);

        const prvPEM = rs.KEYUTIL.getPEM(prvKeyObj, 'PKCS1PRV');
        const pubPEM = rs.KEYUTIL.getPEM(pubKeyObj);

        rsu.saveFile('src/oauth-private.key', prvPEM);
        rsu.saveFile('src/oauth-public.key', pubPEM);
    }
}
