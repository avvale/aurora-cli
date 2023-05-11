import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdatePermissionsHandler } from '../handlers/iam-update-permissions.handler';
import { IamPermission, IamUpdatePermissionsInput } from '@api/graphql';

@Resolver()
@Auth('iam.permission.update')
export class IamUpdatePermissionsResolver
{
    constructor(
        private readonly handler: IamUpdatePermissionsHandler,
    ) {}

    @Mutation('iamUpdatePermissions')
    async main(
        @Args('payload') payload: IamUpdatePermissionsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}