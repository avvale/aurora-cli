import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamFindTenantByIdHandler } from '../handlers/iam-find-tenant-by-id.handler';
import { IamTenant } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindTenantByIdResolver
{
    constructor(
        private readonly handler: IamFindTenantByIdHandler,
    ) {}

    @Query('iamFindTenantById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}