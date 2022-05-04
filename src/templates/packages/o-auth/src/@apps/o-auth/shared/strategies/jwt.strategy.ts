import * as fs from 'fs';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IQueryBus, Jwt } from 'aurora-ts-core';
import { IamUserModel } from '../../../../@apps/iam/user/infrastructure/sequelize/sequelize-user.model';
import { IamAccountDto } from '../../../../@api/iam/account/dto';
import { FindAccountQuery } from '../../../../@apps/iam/account/application/find/find-account.query';
import { IamAccount } from '../../../../graphql';

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
            secretOrKey     : fs.readFileSync('src/oauth-public.key'),
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
                    model: IamUserModel,
                    as   : 'user',
                },
            ],
        }));
    }
}