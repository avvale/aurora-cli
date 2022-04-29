import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { IamCreateRolesHandler } from '../handlers/iam-create-roles.handler';
import { IamCreateRoleInput } from '../../../../graphql';

@Resolver()
export class IamCreateRolesResolver
{
    constructor(
        private readonly handler: IamCreateRolesHandler,
    ) {}

    @Mutation('iamCreateRoles')
    async main(
        @Args('payload') payload: IamCreateRoleInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}