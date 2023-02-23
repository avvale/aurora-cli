import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpsertAccountHandler } from '../handlers/iam-upsert-account.handler';
import { IamAccount, IamUpdateAccountByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.account.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpsertAccountResolver
{
    constructor(
        private readonly handler: IamUpsertAccountHandler,
    ) {}

    @Mutation('iamUpsertAccount')
    async main(
        @Args('payload') payload: IamUpdateAccountByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}