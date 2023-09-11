import { IamTenantAccount, IamUpdateTenantAccountByIdInput } from '@api/graphql';
import { IamUpsertTenantAccountHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.upsert')
export class IamUpsertTenantAccountResolver
{
    constructor(
        private readonly handler: IamUpsertTenantAccountHandler,
    ) {}

    @Mutation('iamUpsertTenantAccount')
    async main(
        @Args('payload') payload: IamUpdateTenantAccountByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenantAccount>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
