import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateRoleByIdHandler } from '../handlers/iam-update-role-by-id.handler';
import { IamRole, IamUpdateRoleByIdInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.role.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateRoleByIdResolver
{
    constructor(
        private readonly handler: IamUpdateRoleByIdHandler,
    ) {}

    @Mutation('iamUpdateRoleById')
    async main(
        @Args('payload') payload: IamUpdateRoleByIdInput,
        @Args('constraint') constraint?: QueryStatement,
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