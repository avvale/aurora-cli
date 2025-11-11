import {
    IamPermissionRole,
    IamUpdatePermissionsRolesInput,
} from '@api/graphql';
import { IamUpdatePermissionsRolesHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permissionRole.update')
export class IamUpdatePermissionsRolesResolver {
    constructor(private readonly handler: IamUpdatePermissionsRolesHandler) {}

    @Mutation('iamUpdatePermissionsRoles')
    async main(
        @Args('payload') payload: IamUpdatePermissionsRolesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermissionRole> {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
