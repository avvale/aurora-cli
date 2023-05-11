import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeletePermissionByIdHandler } from '../handlers/iam-delete-permission-by-id.handler';
import { IamPermission } from '@api/graphql';

@Resolver()
@Auth('iam.permission.delete')
export class IamDeletePermissionByIdResolver
{
    constructor(
        private readonly handler: IamDeletePermissionByIdHandler,
    ) {}

    @Mutation('iamDeletePermissionById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}