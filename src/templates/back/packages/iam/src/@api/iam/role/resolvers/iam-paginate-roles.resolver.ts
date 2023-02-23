import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamPaginateRolesHandler } from '../handlers/iam-paginate-roles.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('iam.role.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamPaginateRolesResolver
{
    constructor(
        private readonly handler: IamPaginateRolesHandler,
    ) {}

    @Query('iamPaginateRoles')
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