import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteAccountsHandler } from '../handlers/iam-delete-accounts.handler';
import { IamAccount } from '@api/graphql';

@Resolver()
@Auth('iam.account.delete')
export class IamDeleteAccountsResolver
{
    constructor(
        private readonly handler: IamDeleteAccountsHandler,
    ) {}

    @Mutation('iamDeleteAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}