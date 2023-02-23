import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreatePermissionRoleHandler } from '../handlers/iam-create-permission-role.handler';
import { IamPermissionRole, IamCreatePermissionRoleInput } from '@api/graphql';

@Resolver()
@Permissions('iam.role.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreatePermissionRoleResolver
{
    constructor(
        private readonly handler: IamCreatePermissionRoleHandler,
    ) {}

    @Mutation('iamCreatePermissionRole')
    async main(
        @Args('payload') payload: IamCreatePermissionRoleInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermissionRole>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}