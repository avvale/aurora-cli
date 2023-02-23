import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateTenantByIdHandler } from '../handlers/iam-update-tenant-by-id.handler';
import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateTenantByIdResolver
{
    constructor(
        private readonly handler: IamUpdateTenantByIdHandler,
    ) {}

    @Mutation('iamUpdateTenantById')
    async main(
        @Args('payload') payload: IamUpdateTenantByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}