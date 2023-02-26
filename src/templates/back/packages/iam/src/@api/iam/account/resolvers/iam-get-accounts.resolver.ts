import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetAccountsHandler } from '../handlers/iam-get-accounts.handler';
import { IamAccount } from '@api/graphql';

@Resolver()
@Auth('iam.account.get')
export class IamGetAccountsResolver
{
    constructor(
        private readonly handler: IamGetAccountsHandler,
    ) {}

    @Query('iamGetAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
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