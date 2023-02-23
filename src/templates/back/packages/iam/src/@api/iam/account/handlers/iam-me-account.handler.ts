import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IQueryBus, Jwt } from '@aurora-ts/core';

// @app
import { FindAccessTokenByIdQuery } from '@app/o-auth/access-token/application/find/find-access-token-by-id.query';
import { FindAccountQuery } from '@app/iam/account/application/find/find-account.query';
import { IamAccount } from '@api/graphql';
import { IamAccountDto } from '../dto';

@Injectable()
export class IamMeAccountHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService,
    ) {}

    async main(
        authorization: string,
    ): Promise<IamAccount | IamAccountDto>
    {
        // get token from Headers
        const jwt = <Jwt>this.jwtService.decode(authorization.replace('Bearer ', ''));

        // get access token from database
        const accessToken = await this.queryBus.ask(new FindAccessTokenByIdQuery(jwt.jit));

        // get account who belongs this token
        return await this.queryBus.ask(new FindAccountQuery({
            where: {
                id: accessToken.accountId,
            },
            include: [
                {
                    association: 'user',
                },
                {
                    association: 'tenants',
                },
            ],
        }));
    }
}