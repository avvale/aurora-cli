import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamFindTenantHandler } from '../handlers/iam-find-tenant.handler';
import { IamTenant } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindTenantResolver
{
    constructor(
        private readonly handler: IamFindTenantHandler,
    ) {}

    @Query('iamFindTenant')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
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