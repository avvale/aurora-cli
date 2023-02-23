import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateAccountByIdHandler } from '../handlers/iam-update-account-by-id.handler';
import { IamAccount, IamUpdateAccountByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.account.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateAccountByIdResolver
{
    constructor(
        private readonly handler: IamUpdateAccountByIdHandler,
    ) {}

    @Mutation('iamUpdateAccountById')
    async main(
        @Args('payload') payload: IamUpdateAccountByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}