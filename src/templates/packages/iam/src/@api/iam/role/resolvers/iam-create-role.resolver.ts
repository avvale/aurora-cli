import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { IamCreateRoleHandler } from '../handlers/iam-create-role.handler';
import { IamRole, IamCreateRoleInput } from '../../../../graphql';

@Resolver()
export class IamCreateRoleResolver
{
    constructor(
        private readonly handler: IamCreateRoleHandler,
    ) {}

    @Mutation('iamCreateRole')
    async main(
        @Args('payload') payload: IamCreateRoleInput,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}