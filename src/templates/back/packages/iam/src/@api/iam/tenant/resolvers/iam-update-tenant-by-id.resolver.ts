import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateTenantByIdHandler } from '../handlers/iam-update-tenant-by-id.handler';
import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';

@Resolver()
@Auth('iam.tenant.update')
export class IamUpdateTenantByIdResolver
{
    constructor(
        private readonly handler: IamUpdateTenantByIdHandler,
    ) {}

    @Mutation('iamUpdateTenantById')
    async main(
        @Args('payload') payload: IamUpdateTenantByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}