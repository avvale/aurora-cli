import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateAccountsHandler } from '../handlers/iam-update-accounts.handler';
import { IamAccount, IamUpdateAccountsInput } from '@api/graphql';

@Resolver()
@Permissions('iam.account.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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