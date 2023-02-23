import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteAccountByIdHandler } from '../handlers/iam-delete-account-by-id.handler';
import { IamAccount } from '@api/graphql';

@Resolver()
@Permissions('iam.account.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteAccountByIdResolver
{
    constructor(
        private readonly handler: IamDeleteAccountByIdHandler,
    ) {}

    @Mutation('iamDeleteAccountById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}