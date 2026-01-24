import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as jwksRsa from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class MsEntraIdStrategy extends PassportStrategy(Strategy, 'MsEntraId') {
  constructor(protected readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://login.microsoftonline.com/${configService.get('MS_ENTRA_ID_TENANT_ID')}/discovery/keys`,
      }),
      issuer: `https://sts.windows.net/${configService.get('MS_ENTRA_ID_TENANT_ID')}/`,
      audience: configService.get('MS_ENTRA_ID_APPLICATION_URI_ID'),
      loggingLevel: 'debug',
    });
  }

  validate(payload: any, done: VerifiedCallback): void {
    if (!payload || !payload.sub) {
      return done(new UnauthorizedException('Invalid token'), false);
    }
    return done(null, payload);
  }
}
