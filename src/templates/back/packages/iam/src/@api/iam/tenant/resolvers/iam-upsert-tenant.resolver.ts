import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';
import { IamUpsertTenantHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.upsert')
export class IamUpsertTenantResolver
{
    constructor(
        private readonly handler: IamUpsertTenantHandler,
    ) {}

    @Mutation('iamUpsertTenant')
    async main(
        @Args('payload') payload: IamUpdateTenantByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
