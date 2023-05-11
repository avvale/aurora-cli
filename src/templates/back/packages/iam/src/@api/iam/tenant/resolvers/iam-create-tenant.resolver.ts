import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateTenantHandler } from '../handlers/iam-create-tenant.handler';
import { IamTenant, IamCreateTenantInput } from '@api/graphql';

@Resolver()
@Auth('iam.tenant.create')
export class IamCreateTenantResolver
{
    constructor(
        private readonly handler: IamCreateTenantHandler,
    ) {}

    @Mutation('iamCreateTenant')
    async main(
        @Args('payload') payload: IamCreateTenantInput,
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