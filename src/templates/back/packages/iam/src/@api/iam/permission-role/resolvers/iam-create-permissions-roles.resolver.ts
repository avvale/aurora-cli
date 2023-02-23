import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreatePermissionsRolesHandler } from '../handlers/iam-create-permissions-roles.handler';
import { IamCreatePermissionRoleInput } from '@api/graphql';

@Resolver()
@Permissions('iam.role.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreatePermissionsRolesResolver
{
    constructor(
        private readonly handler: IamCreatePermissionsRolesHandler,
    ) {}

    @Mutation('iamCreatePermissionsRoles')
    async main(
        @Args('payload') payload: IamCreatePermissionRoleInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}