import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateTenantByIdHandler } from '../handlers/iam-update-tenant-by-id.handler';
import { IamTenant, IamUpdateTenantByIdInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.tenant.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateTenantByIdResolver
{
    constructor(
        private readonly handler: IamUpdateTenantByIdHandler,
    ) {}

    @Mutation('iamUpdateTenantById')
    async main(
        @Args('payload') payload: IamUpdateTenantByIdInput,
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