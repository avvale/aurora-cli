import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamUpdateAccountHandler } from '../handlers/iam-update-account.handler';
import { IamAccount, IamUpdateAccountInput } from '../../../../graphql';

@Resolver()
export class IamUpdateAccountResolver
{
    constructor(
        private readonly handler: IamUpdateAccountHandler,
    ) {}

    @Mutation('iamUpdateAccount')
    async main(
        @Args('payload') payload: IamUpdateAccountInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}