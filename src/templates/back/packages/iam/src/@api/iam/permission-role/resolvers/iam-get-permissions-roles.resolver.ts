import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamGetPermissionsRolesHandler } from '../handlers/iam-get-permissions-roles.handler';
import { IamPermissionRole } from '@api/graphql';

@Resolver()
@Permissions('iam.role.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamGetPermissionsRolesResolver
{
    constructor(
        private readonly handler: IamGetPermissionsRolesHandler,
    ) {}

    @Query('iamGetPermissionsRoles')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermissionRole[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}