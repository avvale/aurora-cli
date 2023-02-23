import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteAccountsHandler } from '../handlers/iam-delete-accounts.handler';
import { IamAccount } from '@api/graphql';

@Resolver()
@Permissions('iam.account.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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