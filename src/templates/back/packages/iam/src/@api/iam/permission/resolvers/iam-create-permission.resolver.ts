import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreatePermissionHandler } from '../handlers/iam-create-permission.handler';
import { IamPermission, IamCreatePermissionInput } from '@api/graphql';

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