import { iamMockAccountData } from '@app/iam/account/infrastructure/mock/iam-mock-account.data';
import { Jwt, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { accessTokens } from '../seeds/access-token.seed';

@Injectable()
export class OAuthMockJwtService {
  constructor(private readonly jwtService: JwtService) {}

  getJwt(): string {
    const accessTokenPayload: Jwt = {
      jit: accessTokens[0].id,
      aci: iamMockAccountData[0].id,
      iss: 'Aurora Testing OAuth',
      iat: parseInt(Utils.now().format('X')),
      nbf: parseInt(Utils.now().format('X')),
      exp: parseInt(Utils.now().add(600, 'seconds').format('X')),
    };

    return this.jwtService.sign(accessTokenPayload);
  }
}
