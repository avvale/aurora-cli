import { Pagination } from '@api/graphql';
import { IamPaginateTenantsAccountsHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.get')
export class IamPaginateTenantsAccountsResolver {
    constructor(private readonly handler: IamPaginateTenantsAccountsHandler) {}

    @Query('iamPaginateTenantsAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
