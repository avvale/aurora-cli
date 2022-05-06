import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreateTenantsHandler } from '../handlers/iam-create-tenants.handler';
import { IamCreateTenantInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.tenant.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateTenantsResolver
{
    constructor(
        private readonly handler: IamCreateTenantsHandler,
    ) {}

    @Mutation('iamCreateTenants')
    async main(
        @Args('payload') payload: IamCreateTenantInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}