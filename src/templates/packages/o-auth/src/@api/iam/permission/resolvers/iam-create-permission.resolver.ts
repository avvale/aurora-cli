import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreatePermissionHandler } from '../handlers/iam-create-permission.handler';
import { IamPermission, IamCreatePermissionInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.permission.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreatePermissionResolver
{
    constructor(
        private readonly handler: IamCreatePermissionHandler,
    ) {}

    @Mutation('iamCreatePermission')
    async main(
        @Args('payload') payload: IamCreatePermissionInput,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}