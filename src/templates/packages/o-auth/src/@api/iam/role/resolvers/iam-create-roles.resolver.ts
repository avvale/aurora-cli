import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreateRolesHandler } from '../handlers/iam-create-roles.handler';
import { IamCreateRoleInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateRolesResolver
{
    constructor(
        private readonly handler: IamCreateRolesHandler,
    ) {}

    @Mutation('iamCreateRoles')
    async main(
        @Args('payload') payload: IamCreateRoleInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}