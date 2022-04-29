import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeleteTenantsHandler } from '../handlers/iam-delete-tenants.handler';
import { IamTenant } from '../../../../graphql';

@Resolver()
export class IamDeleteTenantsResolver
{
    constructor(
        private readonly handler: IamDeleteTenantsHandler,
    ) {}

    @Mutation('iamDeleteTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}