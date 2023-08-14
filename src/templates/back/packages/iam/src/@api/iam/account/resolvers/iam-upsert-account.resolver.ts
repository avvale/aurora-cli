import { IamAccount, IamUpdateAccountByIdInput } from '@api/graphql';
import { IamUpsertAccountHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.account.upsert')
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
