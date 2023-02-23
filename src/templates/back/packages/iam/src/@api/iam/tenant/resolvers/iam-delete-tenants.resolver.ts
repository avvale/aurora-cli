import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteTenantsHandler } from '../handlers/iam-delete-tenants.handler';
import { IamTenant } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteTenantsResolver
{
    constructor(
        private readonly handler: IamDeleteTenantsHandler,
    ) {}

    @Mutation('iamDeleteTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenant[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}