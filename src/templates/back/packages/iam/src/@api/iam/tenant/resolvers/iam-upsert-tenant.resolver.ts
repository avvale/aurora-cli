import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertTenantHandler } from '../handlers/iam-upsert-tenant.handler';
import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';

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