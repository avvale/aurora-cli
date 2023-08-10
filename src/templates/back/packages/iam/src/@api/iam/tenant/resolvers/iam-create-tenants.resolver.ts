import { IamCreateTenantInput } from '@api/graphql';
import { IamCreateTenantsHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.create')
export class IamCreateTenantsResolver
{
    constructor(
        private readonly handler: IamCreateTenantsHandler,
    ) {}

    @Mutation('iamCreateTenants')
    async main(
        @Args('payload') payload: IamCreateTenantInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
