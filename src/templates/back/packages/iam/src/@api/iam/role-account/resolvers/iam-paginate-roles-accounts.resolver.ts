import { Pagination } from '@api/graphql';
import { IamPaginateRolesAccountsHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.roleAccount.get')
export class IamPaginateRolesAccountsResolver
{
    constructor(
        private readonly handler: IamPaginateRolesAccountsHandler,
    ) {}

    @Query('iamPaginateRolesAccounts')
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
