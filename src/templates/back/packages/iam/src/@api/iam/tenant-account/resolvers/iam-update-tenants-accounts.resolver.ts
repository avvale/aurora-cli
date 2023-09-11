import { IamTenantAccount, IamUpdateTenantsAccountsInput } from '@api/graphql';
import { IamUpdateTenantsAccountsHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.update')
export class IamUpdateTenantsAccountsResolver
{
    constructor(
        private readonly handler: IamUpdateTenantsAccountsHandler,
    ) {}

    @Mutation('iamUpdateTenantsAccounts')
    async main(
        @Args('payload') payload: IamUpdateTenantsAccountsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenantAccount>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
