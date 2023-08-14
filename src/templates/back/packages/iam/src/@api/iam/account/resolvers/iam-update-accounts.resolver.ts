import { IamAccount, IamUpdateAccountsInput } from '@api/graphql';
import { IamUpdateAccountsHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
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
        @Args('payload') payload: IamUpdateAccountsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
