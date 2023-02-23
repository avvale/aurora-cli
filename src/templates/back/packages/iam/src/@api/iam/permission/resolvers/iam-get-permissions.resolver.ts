import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamGetPermissionsHandler } from '../handlers/iam-get-permissions.handler';
import { IamPermission } from '@api/graphql';

@Resolver()
@Permissions('iam.permission.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamGetPermissionsResolver
{
    constructor(
        private readonly handler: IamGetPermissionsHandler,
    ) {}

    @Query('iamGetPermissions')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}