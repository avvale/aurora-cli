import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { IamCreatePermissionsHandler } from '../handlers/iam-create-permissions.handler';
import { IamCreatePermissionInput } from '../../../../graphql';

@Resolver()
export class IamCreatePermissionsResolver
{
    constructor(
        private readonly handler: IamCreatePermissionsHandler,
    ) {}

    @Mutation('iamCreatePermissions')
    async main(
        @Args('payload') payload: IamCreatePermissionInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}