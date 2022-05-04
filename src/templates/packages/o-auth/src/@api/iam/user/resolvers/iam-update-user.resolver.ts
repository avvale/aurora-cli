import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamUpdateUserHandler } from '../handlers/iam-update-user.handler';
import { IamUser, IamUpdateUserInput } from '../../../../graphql';

@Resolver()
export class IamUpdateUserResolver
{
    constructor(
        private readonly handler: IamUpdateUserHandler,
    ) {}

    @Mutation('iamUpdateUser')
    async main(
        @Args('payload') payload: IamUpdateUserInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}