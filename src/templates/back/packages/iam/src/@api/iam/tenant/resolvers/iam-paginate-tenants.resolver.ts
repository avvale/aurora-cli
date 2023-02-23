import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamPaginateTenantsHandler } from '../handlers/iam-paginate-tenants.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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