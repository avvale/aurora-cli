import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamPaginateAccountsHandler } from '../handlers/iam-paginate-accounts.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class IamPaginateAccountsResolver
{
    constructor(
        private readonly handler: IamPaginateAccountsHandler,
    ) {}

    @Query('iamPaginateAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
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