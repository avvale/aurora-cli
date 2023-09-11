import { IamTenantAccount } from '@api/graphql';
import { IamGetTenantsAccountsHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.get')
export class IamGetTenantsAccountsResolver
{
    constructor(
        private readonly handler: IamGetTenantsAccountsHandler,
    ) {}

    @Query('iamGetTenantsAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenantAccount[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
