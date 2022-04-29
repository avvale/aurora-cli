import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { IamCreateUserHandler } from '../handlers/iam-create-user.handler';
import { IamUser, IamCreateUserInput } from '../../../../graphql';

@Resolver()
export class IamCreateUserResolver
{
    constructor(
        private readonly handler: IamCreateUserHandler,
    ) {}

    @Mutation('iamCreateUser')
    async main(
        @Args('payload') payload: IamCreateUserInput,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}