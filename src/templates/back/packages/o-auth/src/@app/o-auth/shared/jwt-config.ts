import * as fs from 'node:fs';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
    privateKey : fs.readFileSync('oauth-private.key', 'utf8'),
    publicKey  : fs.readFileSync('oauth-public.key', 'utf8'),
    signOptions: {
        algorithm: 'RS256',
    },
};