import { IamCreateTenantAccountInput, IamTenantAccount } from '@api/graphql';
import { IamCreateTenantAccountHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.create')
export class IamCreateTenantAccountResolver
{
    constructor(
        private readonly handler: IamCreateTenantAccountHandler,
    ) {}

    @Mutation('iamCreateTenantAccount')
    async main(
        @Args('payload') payload: IamCreateTenantAccountInput,
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
