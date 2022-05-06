import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateTenantHandler } from '../handlers/iam-update-tenant.handler';
import { IamTenant, IamUpdateTenantInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.tenant.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateTenantResolver
{
    constructor(
        private readonly handler: IamUpdateTenantHandler,
    ) {}

    @Mutation('iamUpdateTenant')
    async main(
        @Args('payload') payload: IamUpdateTenantInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}