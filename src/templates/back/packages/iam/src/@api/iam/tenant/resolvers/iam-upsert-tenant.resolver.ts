import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpsertTenantHandler } from '../handlers/iam-upsert-tenant.handler';
import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpsertTenantResolver
{
    constructor(
        private readonly handler: IamUpsertTenantHandler,
    ) {}

    @Mutation('iamUpsertTenant')
    async main(
        @Args('payload') payload: IamUpdateTenantByIdInput,
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