import { IamTenant, IamUpdateTenantsInput } from '@api/graphql';
import { IamUpdateTenantsHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.update')
export class IamUpdateTenantsResolver
{
    constructor(
        private readonly handler: IamUpdateTenantsHandler,
    ) {}

    @Mutation('iamUpdateTenants')
    async main(
        @Args('payload') payload: IamUpdateTenantsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
