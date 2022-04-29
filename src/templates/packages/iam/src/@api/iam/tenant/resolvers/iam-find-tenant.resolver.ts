import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamFindTenantHandler } from '../handlers/iam-find-tenant.handler';
import { IamTenant } from '../../../../graphql';

@Resolver()
export class IamFindTenantResolver
{
    constructor(
        private readonly handler: IamFindTenantHandler,
    ) {}

    @Query('iamFindTenant')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}