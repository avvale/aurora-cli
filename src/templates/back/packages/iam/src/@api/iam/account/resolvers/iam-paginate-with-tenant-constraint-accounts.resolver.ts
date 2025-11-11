import { Pagination } from '@api/graphql';
import { IamPaginateAccountsHandler } from '@api/iam/account';
import { TenantConstraint } from '@api/iam/shared';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.account.get')
export class IamPaginateWithTenantConstraintAccountsResolver {
    constructor(private readonly handler: IamPaginateAccountsHandler) {}

    @Query('iamPaginateWithTenantConstraintAccounts')
    @TenantConstraint({
        targetProperty: 'dTenants',
    })
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
