import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateTenantsHandler } from '../handlers/iam-create-tenants.handler';
import { IamCreateTenantInput } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreateTenantsResolver
{
    constructor(
        private readonly handler: IamCreateTenantsHandler,
    ) {}

    @Mutation('iamCreateTenants')
    async main(
        @Args('payload') payload: IamCreateTenantInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}