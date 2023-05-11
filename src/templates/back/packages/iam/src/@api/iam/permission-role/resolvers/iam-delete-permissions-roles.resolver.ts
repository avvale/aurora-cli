import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeletePermissionsRolesHandler } from '../handlers/iam-delete-permissions-roles.handler';
import { IamDeletePermissionRoleInput, IamPermissionRole } from '@api/graphql';

@Resolver()
@Auth('iam.role.delete')
export class IamDeletePermissionsRolesResolver
{
    constructor(
        private readonly handler: IamDeletePermissionsRolesHandler,
    ) {}

    @Mutation('iamDeletePermissionsRoles')
    async main(
        @Args('payload') payload?: IamDeletePermissionRoleInput[],
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermissionRole[]>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}