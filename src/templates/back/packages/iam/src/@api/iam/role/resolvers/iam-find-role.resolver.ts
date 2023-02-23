import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamFindRoleHandler } from '../handlers/iam-find-role.handler';
import { IamRole } from '@api/graphql';

@Resolver()
@Permissions('iam.role.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindRoleResolver
{
    constructor(
        private readonly handler: IamFindRoleHandler,
    ) {}

    @Query('iamFindRole')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}