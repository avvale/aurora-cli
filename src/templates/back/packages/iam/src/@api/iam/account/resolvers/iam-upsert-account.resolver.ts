import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertAccountHandler } from '../handlers/iam-upsert-account.handler';
import { IamAccount, IamUpdateAccountByIdInput } from '@api/graphql';

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