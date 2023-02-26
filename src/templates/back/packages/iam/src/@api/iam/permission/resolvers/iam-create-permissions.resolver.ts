import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreatePermissionsHandler } from '../handlers/iam-create-permissions.handler';
import { IamCreatePermissionInput } from '@api/graphql';

@Resolver()
@Auth('iam.permission.create')
export class IamCreatePermissionsResolver
{
    constructor(
        private readonly handler: IamCreatePermissionsHandler,
    ) {}

    @Mutation('iamCreatePermissions')
    async main(
        @Args('payload') payload: IamCreatePermissionInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}