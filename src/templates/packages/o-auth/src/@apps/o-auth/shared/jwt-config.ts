import * as fs from 'node:fs';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
    privateKey : fs.readFileSync('src/oauth-private.key', 'utf8'),
    publicKey  : fs.readFileSync('src/oauth-public.key', 'utf8'),
    signOptions: {
        algorithm: 'RS256',
    },
};