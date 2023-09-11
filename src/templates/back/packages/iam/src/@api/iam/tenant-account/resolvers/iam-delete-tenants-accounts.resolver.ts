import { IamTenantAccount } from '@api/graphql';
import { IamDeleteTenantsAccountsHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.delete')
export class IamDeleteTenantsAccountsResolver
{
    constructor(
        private readonly handler: IamDeleteTenantsAccountsHandler,
    ) {}

    @Mutation('iamDeleteTenantsAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenantAccount[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
