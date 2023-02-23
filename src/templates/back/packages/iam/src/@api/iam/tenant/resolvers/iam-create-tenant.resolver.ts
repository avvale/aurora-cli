import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateTenantHandler } from '../handlers/iam-create-tenant.handler';
import { IamTenant, IamCreateTenantInput } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreateTenantResolver
{
    constructor(
        private readonly handler: IamCreateTenantHandler,
    ) {}

    @Mutation('iamCreateTenant')
    async main(
        @Args('payload') payload: IamCreateTenantInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}