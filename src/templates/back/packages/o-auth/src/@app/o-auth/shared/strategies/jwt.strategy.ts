import * as fs from 'fs';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IQueryBus, Jwt } from '@aurora-ts/core';
// todo, mover a @api para evitar coger un recurso de @api, desde el dominio?? no queda claro, donde se ubica la carpeta shared
import { IamAccountDto } from '@api/iam/account/dto';
import { FindAccountQuery } from '@app/iam/account/application/find/find-account.query';
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
        return await this.queryBus.ask(new FindAccountQuery({
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