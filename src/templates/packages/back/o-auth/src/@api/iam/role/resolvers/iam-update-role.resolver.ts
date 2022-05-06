import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateRoleHandler } from '../handlers/iam-update-role.handler';
import { IamRole, IamUpdateRoleInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.role.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateRoleResolver
{
    constructor(
        private readonly handler: IamUpdateRoleHandler,
    ) {}

    @Mutation('iamUpdateRole')
    async main(
        @Args('payload') payload: IamUpdateRoleInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}