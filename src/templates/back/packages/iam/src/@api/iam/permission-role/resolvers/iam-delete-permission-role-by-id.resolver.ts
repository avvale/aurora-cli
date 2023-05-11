import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeletePermissionRoleByIdHandler } from '../handlers/iam-delete-permission-role-by-id.handler';
import { IamDeletePermissionRoleInput, IamPermissionRole } from '@api/graphql';

@Resolver()
@Auth('iam.role.delete')
export class IamDeletePermissionRoleByIdResolver
{
    constructor(
        private readonly handler: IamDeletePermissionRoleByIdHandler,
    ) {}

    @Mutation('iamDeletePermissionRoleById')
    async main(
        @Args('payload') payload: IamDeletePermissionRoleInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermissionRole>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}