import { IamPermission, IamUpdatePermissionsInput } from '@api/graphql';
import { IamUpdatePermissionsHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
