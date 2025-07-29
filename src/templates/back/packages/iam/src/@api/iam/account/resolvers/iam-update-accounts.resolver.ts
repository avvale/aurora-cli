import { IamAccount, IamUpdateAccountsInput } from '@api/graphql';
import { IamUpdateAccountsHandler } from '@api/iam/account';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.account.update')
export class IamUpdateAccountsResolver
{
    constructor(
        private readonly handler: IamUpdateAccountsHandler,
    ) {}

    @Mutation('iamUpdateAccounts')
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('payload') payload: IamUpdateAccountsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            account,
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
