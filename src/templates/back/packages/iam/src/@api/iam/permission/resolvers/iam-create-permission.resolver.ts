import { IamCreatePermissionInput, IamPermission } from '@api/graphql';
import { IamCreatePermissionHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permission.create')
export class IamCreatePermissionResolver
{
    constructor(
        private readonly handler: IamCreatePermissionHandler,
    ) {}

    @Mutation('iamCreatePermission')
    async main(
        @Args('payload') payload: IamCreatePermissionInput,
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
