import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamPaginateAccountsHandler } from '../handlers/iam-paginate-accounts.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('iam.account.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamPaginateAccountsResolver
{
    constructor(
        private readonly handler: IamPaginateAccountsHandler,
    ) {}

    @Query('iamPaginateAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}