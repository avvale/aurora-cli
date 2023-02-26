import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteTenantsHandler } from '../handlers/iam-delete-tenants.handler';
import { IamTenant } from '@api/graphql';

@Resolver()
@Auth('iam.tenant.delete')
export class IamDeleteTenantsResolver
{
    constructor(
        private readonly handler: IamDeleteTenantsHandler,
    ) {}

    @Mutation('iamDeleteTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenant[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}