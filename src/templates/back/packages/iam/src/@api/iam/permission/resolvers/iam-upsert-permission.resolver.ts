import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';
import { IamUpsertPermissionHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
