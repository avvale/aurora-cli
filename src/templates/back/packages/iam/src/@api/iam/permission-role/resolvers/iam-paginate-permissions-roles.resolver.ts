import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamPaginatePermissionsRolesHandler } from '../handlers/iam-paginate-permissions-roles.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('iam.role.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamPaginatePermissionsRolesResolver
{
    constructor(
        private readonly handler: IamPaginatePermissionsRolesHandler,
    ) {}

    @Query('iamPaginatePermissionsRoles')
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