import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateAccountsHandler } from '../handlers/iam-update-accounts.handler';
import { IamAccount, IamUpdateAccountsInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.account.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
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
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}