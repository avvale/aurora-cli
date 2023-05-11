import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamPaginateAccountsHandler } from '../handlers/iam-paginate-accounts.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('iam.account.get')
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