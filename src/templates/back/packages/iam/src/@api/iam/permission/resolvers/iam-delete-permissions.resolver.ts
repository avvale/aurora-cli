import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeletePermissionsHandler } from '../handlers/iam-delete-permissions.handler';
import { IamPermission } from '@api/graphql';

@Resolver()
@Auth('iam.permission.delete')
export class IamDeletePermissionsResolver
{
    constructor(
        private readonly handler: IamDeletePermissionsHandler,
    ) {}

    @Mutation('iamDeletePermissions')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}