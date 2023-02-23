import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Context } from '@nestjs/graphql';
import { AuthenticationGuard } from '@aurora-ts/core';
import { IamAccount } from '@api/graphql';

// @app
import { IamMeAccountHandler } from '../handlers/iam-me-account.handler';
@Resolver()
@UseGuards(AuthenticationGuard)
export class IamMeAccountResolver
{
    constructor(
        private readonly handler: IamMeAccountHandler,
    ) {}

    @Query('iamMeAccount')
    async main(@Context() context): Promise<IamAccount>
    {
        return await this.handler.main(
            context.req.headers.authorization,
        );
    }
}