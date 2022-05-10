import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateTenantsHandler } from '../handlers/iam-update-tenants.handler';
import { IamTenant, IamUpdateTenantsInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.tenant.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateTenantsResolver
{
    constructor(
        private readonly handler: IamUpdateTenantsHandler,
    ) {}

    @Mutation('iamUpdateTenants')
    async main(
        @Args('payload') payload: IamUpdateTenantsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}