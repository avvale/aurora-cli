import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamGetTenantsHandler } from '../handlers/iam-get-tenants.handler';
import { IamTenant } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamGetTenantsResolver
{
    constructor(
        private readonly handler: IamGetTenantsHandler,
    ) {}

    @Query('iamGetTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}