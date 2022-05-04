import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Jwt, Utils } from 'aurora-ts-core';
import { accessTokens } from '../seeds/access-token.seed';
import { accounts } from '../../../../../@apps/iam/account/infrastructure/seeds/account.seed';

@Injectable()
export class MockJwtService
{
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    getJwt(): string
    {
        const accessTokenPayload: Jwt = {
            jit: accessTokens[0].id,
            aci: accounts[0].id,
            iss: 'Aurora Testing OAuth',
            iat: parseInt(Utils.now().format('X')),
            nbf: parseInt(Utils.now().format('X')),
            exp: parseInt(Utils.now().add(600, 'seconds').format('X')),
        };

        return this.jwtService.sign(accessTokenPayload);
    }
}