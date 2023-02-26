import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateAccountsHandler } from '../handlers/iam-update-accounts.handler';
import { IamAccount, IamUpdateAccountsInput } from '@api/graphql';

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