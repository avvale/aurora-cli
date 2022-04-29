import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { IamCreateAccountsHandler } from '../handlers/iam-create-accounts.handler';
import { IamCreateAccountInput } from '../../../../graphql';

@Resolver()
export class IamCreateAccountsResolver
{
    constructor(
        private readonly handler: IamCreateAccountsHandler,
    ) {}

    @Mutation('iamCreateAccounts')
    async main(
        @Args('payload') payload: IamCreateAccountInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}