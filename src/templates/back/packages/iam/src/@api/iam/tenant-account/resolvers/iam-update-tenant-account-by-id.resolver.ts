import { IamTenantAccount, IamUpdateTenantAccountByIdInput } from '@api/graphql';
import { IamUpdateTenantAccountByIdHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.update')
export class IamUpdateTenantAccountByIdResolver
{
    constructor(
        private readonly handler: IamUpdateTenantAccountByIdHandler,
    ) {}

    @Mutation('iamUpdateTenantAccountById')
    async main(
        @Args('payload') payload: IamUpdateTenantAccountByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenantAccount>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
