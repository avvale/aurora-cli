import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamGetAccountsHandler } from '../handlers/iam-get-accounts.handler';
import { IamAccount } from '../../../../graphql';

@Resolver()
export class IamGetAccountsResolver
{
    constructor(
        private readonly handler: IamGetAccountsHandler,
    ) {}

    @Query('iamGetAccounts')
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