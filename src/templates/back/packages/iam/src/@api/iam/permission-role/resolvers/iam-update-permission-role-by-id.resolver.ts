import {
    IamPermissionRole,
    IamUpdatePermissionRoleByIdInput,
} from '@api/graphql';
import { IamUpdatePermissionRoleByIdHandler } from '@api/iam/permission-role';
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
export class IamUpdatePermissionRoleByIdResolver {
    constructor(private readonly handler: IamUpdatePermissionRoleByIdHandler) {}

    @Mutation('iamUpdatePermissionRoleById')
    async main(
        @Args('payload') payload: IamUpdatePermissionRoleByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermissionRole> {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
