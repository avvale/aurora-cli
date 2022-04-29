import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamGetTenantsHandler } from '../handlers/iam-get-tenants.handler';
import { IamTenant } from '../../../../graphql';

@Resolver()
export class IamGetTenantsResolver
{
    constructor(
        private readonly handler: IamGetTenantsHandler,
    ) {}

    @Query('iamGetTenants')
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