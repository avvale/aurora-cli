import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamPaginateTenantsHandler } from '../handlers/iam-paginate-tenants.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class IamPaginateTenantsResolver
{
    constructor(
        private readonly handler: IamPaginateTenantsHandler,
    ) {}

    @Query('iamPaginateTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}