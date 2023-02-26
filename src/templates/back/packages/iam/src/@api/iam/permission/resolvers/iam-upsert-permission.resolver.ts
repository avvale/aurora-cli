import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertPermissionHandler } from '../handlers/iam-upsert-permission.handler';
import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';

@Resolver()
@Auth('iam.permission.upsert')
export class IamUpsertPermissionResolver
{
    constructor(
        private readonly handler: IamUpsertPermissionHandler,
    ) {}

    @Mutation('iamUpsertPermission')
    async main(
        @Args('payload') payload: IamUpdatePermissionByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}