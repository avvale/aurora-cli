import { IamAccount } from '@api/graphql';
import { IamFindAccountQuery } from '@app/iam/account';
import { OAuthFindAccessTokenByIdQuery } from '@app/o-auth/access-token';
import { IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IamAccountDto } from '../dto';

@Injectable()
export class IamMeAccountHandler {
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService,
    ) {}

    async main(authorization: string): Promise<IamAccount | IamAccountDto> {
        // get token from Headers
        const jwt = this.jwtService.decode(
            authorization.replace('Bearer ', ''),
        );

        // get access token from database
        const accessToken = await this.queryBus.ask(
            new OAuthFindAccessTokenByIdQuery(jwt.jit),
        );

        // get account who belongs this token
        return await this.queryBus.ask(
            new IamFindAccountQuery({
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
                    {
                        association: 'roles',
                    },
                ],
            }),
        );
    }
}
