import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteTenantByIdHandler } from '../handlers/iam-delete-tenant-by-id.handler';
import { IamTenant } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteTenantByIdResolver
{
    constructor(
        private readonly handler: IamDeleteTenantByIdHandler,
    ) {}

    @Mutation('iamDeleteTenantById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}