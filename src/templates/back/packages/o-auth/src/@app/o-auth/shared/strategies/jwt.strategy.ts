import { IQueryBus, Jwt } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as fs from 'fs';
import { ExtractJwt, Strategy } from 'passport-jwt';
// todo, mover a @api para evitar coger un recurso de @api, desde el dominio?? no queda claro, donde se ubica la carpeta shared
import { IamAccount } from '@api/graphql';
import { IamFindAccountQuery } from '@app/iam/account';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: fs.readFileSync(
                configService.get('OAUTH_PUBLIC_KEY_PATH'),
                'utf8',
            ),
            algorithms: ['RS256'],
        });
    }

    // set user variable in request with return object
    async validate(payload: Jwt): Promise<IamAccount> {
        return await this.queryBus.ask(
            new IamFindAccountQuery({
                where: {
                    id: payload.aci,
                },
                include: [
                    {
                        association: 'user',
                        attributes: {
                            exclude: ['password', 'rememberToken'],
                        },
                    },
                ],
            }),
        );
    }
}
