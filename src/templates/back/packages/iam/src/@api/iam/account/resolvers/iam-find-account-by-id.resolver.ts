import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamFindAccountByIdHandler } from '../handlers/iam-find-account-by-id.handler';
import { IamAccount } from '@api/graphql';

@Resolver()
@Permissions('iam.account.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindAccountByIdResolver
{
    constructor(
        private readonly handler: IamFindAccountByIdHandler,
    ) {}

    @Query('iamFindAccountById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}