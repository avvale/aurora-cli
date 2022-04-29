import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeleteAccountsHandler } from '../handlers/iam-delete-accounts.handler';
import { IamAccount } from '../../../../graphql';

@Resolver()
export class IamDeleteAccountsResolver
{
    constructor(
        private readonly handler: IamDeleteAccountsHandler,
    ) {}

    @Mutation('iamDeleteAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}