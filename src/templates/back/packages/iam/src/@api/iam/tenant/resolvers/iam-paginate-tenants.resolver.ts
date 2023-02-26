import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamPaginateTenantsHandler } from '../handlers/iam-paginate-tenants.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('iam.tenant.get')
export class IamPaginateTenantsResolver
{
    constructor(
        private readonly handler: IamPaginateTenantsHandler,
    ) {}

    @Query('iamPaginateTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
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