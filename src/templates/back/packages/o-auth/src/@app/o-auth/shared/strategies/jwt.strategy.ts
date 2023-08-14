import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IQueryBus, Jwt } from '@aurorajs.dev/core';
// todo, mover a @api para evitar coger un recurso de @api, desde el dominio?? no queda claro, donde se ubica la carpeta shared
import { IamAccountDto } from '@api/iam/account/dto';
import { IamFindAccountQuery } from '@app/iam/account';
import { IamAccount } from '@api/graphql';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        private readonly queryBus: IQueryBus,
    )
    {
        super({
            jwtFromRequest  : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey     : fs.readFileSync('oauth-public.key'),
            algorithms      : ['RS256'],
        });
    }

    // set user variable in request with return object
    async validate(payload: Jwt): Promise<IamAccount | IamAccountDto>
    {
        return await this.queryBus.ask(new IamFindAccountQuery({
            where: {
                id: payload.aci,
            },
            include: [
                {
                    association: 'user',
                    attributes : {
                        exclude: ['password', 'rememberToken'],
                    },
                },
            ],
        }));
    }
}