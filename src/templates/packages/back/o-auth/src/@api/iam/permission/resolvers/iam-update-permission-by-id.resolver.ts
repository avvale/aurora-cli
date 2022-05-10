import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdatePermissionByIdHandler } from '../handlers/iam-update-permission-by-id.handler';
import { IamPermission, IamUpdatePermissionByIdInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.permission.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdatePermissionByIdResolver
{
    constructor(
        private readonly handler: IamUpdatePermissionByIdHandler,
    ) {}

    @Mutation('iamUpdatePermissionById')
    async main(
        @Args('payload') payload: IamUpdatePermissionByIdInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}