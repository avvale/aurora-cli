import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreatePermissionsRolesHandler } from '../handlers/iam-create-permissions-roles.handler';
import { IamCreatePermissionRoleInput } from '@api/graphql';

@Resolver()
@Auth('iam.role.create')
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