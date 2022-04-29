import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { IamCreateUsersHandler } from '../handlers/iam-create-users.handler';
import { IamCreateUserInput } from '../../../../graphql';

@Resolver()
export class IamCreateUsersResolver
{
    constructor(
        private readonly handler: IamCreateUsersHandler,
    ) {}

    @Mutation('iamCreateUsers')
    async main(
        @Args('payload') payload: IamCreateUserInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}