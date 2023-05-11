import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdatePermissionByIdHandler } from '../handlers/iam-update-permission-by-id.handler';
import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';

@Resolver()
@Auth('iam.permission.update')
export class IamUpdatePermissionByIdResolver
{
    constructor(
        private readonly handler: IamUpdatePermissionByIdHandler,
    ) {}

    @Mutation('iamUpdatePermissionById')
    async main(
        @Args('payload') payload: IamUpdatePermissionByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}