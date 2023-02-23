import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamFindPermissionByIdHandler } from '../handlers/iam-find-permission-by-id.handler';
import { IamPermission } from '@api/graphql';

@Resolver()
@Permissions('iam.permission.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindPermissionByIdResolver
{
    constructor(
        private readonly handler: IamFindPermissionByIdHandler,
    ) {}

    @Query('iamFindPermissionById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}