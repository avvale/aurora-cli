import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdatePermissionsHandler } from '../handlers/iam-update-permissions.handler';
import { IamPermission, IamUpdatePermissionsInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.permission.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdatePermissionsResolver
{
    constructor(
        private readonly handler: IamUpdatePermissionsHandler,
    ) {}

    @Mutation('iamUpdatePermissions')
    async main(
        @Args('payload') payload: IamUpdatePermissionsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}