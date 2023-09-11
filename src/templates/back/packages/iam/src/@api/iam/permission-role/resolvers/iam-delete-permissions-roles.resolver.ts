import { IamPermissionRole } from '@api/graphql';
import { IamDeletePermissionsRolesHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permissionRole.delete')
export class IamDeletePermissionsRolesResolver
{
    constructor(
        private readonly handler: IamDeletePermissionsRolesHandler,
    ) {}

    @Mutation('iamDeletePermissionsRoles')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermissionRole[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
