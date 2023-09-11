import { IamPermissionRole, IamUpdatePermissionRoleByIdInput } from '@api/graphql';
import { IamUpsertPermissionRoleHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permissionRole.upsert')
export class IamUpsertPermissionRoleResolver
{
    constructor(
        private readonly handler: IamUpsertPermissionRoleHandler,
    ) {}

    @Mutation('iamUpsertPermissionRole')
    async main(
        @Args('payload') payload: IamUpdatePermissionRoleByIdInput,
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
