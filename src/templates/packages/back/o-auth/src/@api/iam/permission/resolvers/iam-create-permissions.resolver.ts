import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreatePermissionsHandler } from '../handlers/iam-create-permissions.handler';
import { IamCreatePermissionInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.permission.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreatePermissionsResolver
{
    constructor(
        private readonly handler: IamCreatePermissionsHandler,
    ) {}

    @Mutation('iamCreatePermissions')
    async main(
        @Args('payload') payload: IamCreatePermissionInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}