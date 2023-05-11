import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreatePermissionRoleHandler } from '../handlers/iam-create-permission-role.handler';
import { IamPermissionRole, IamCreatePermissionRoleInput } from '@api/graphql';

@Resolver()
@Auth('iam.role.create')
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