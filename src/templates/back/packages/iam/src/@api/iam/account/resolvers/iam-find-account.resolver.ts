import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamFindAccountHandler } from '../handlers/iam-find-account.handler';
import { IamAccount } from '@api/graphql';

@Resolver()
@Permissions('iam.account.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindAccountResolver
{
    constructor(
        private readonly handler: IamFindAccountHandler,
    ) {}

    @Query('iamFindAccount')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}