import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteTenantByIdHandler } from '../handlers/iam-delete-tenant-by-id.handler';
import { IamTenant } from '@api/graphql';

@Resolver()
@Auth('iam.tenant.delete')
export class IamDeleteTenantByIdResolver
{
    constructor(
        private readonly handler: IamDeleteTenantByIdHandler,
    ) {}

    @Mutation('iamDeleteTenantById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}