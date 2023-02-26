import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateTenantsHandler } from '../handlers/iam-create-tenants.handler';
import { IamCreateTenantInput } from '@api/graphql';

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