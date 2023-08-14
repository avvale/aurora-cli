import { IamAccount } from '@api/graphql';
import { IamGetAccountsHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
