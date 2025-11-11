import { IamTenant } from '@api/graphql';
import { IamDeleteTenantsHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.delete')
export class IamDeleteTenantsResolver {
    constructor(private readonly handler: IamDeleteTenantsHandler) {}

    @Mutation('iamDeleteTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenant[]> {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
