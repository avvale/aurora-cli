import { IamRoleAccount, IamUpdateRoleAccountByIdInput } from '@api/graphql';
import { IamUpsertRoleAccountHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.roleAccount.upsert')
export class IamUpsertRoleAccountResolver
{
    constructor(
        private readonly handler: IamUpsertRoleAccountHandler,
    ) {}

    @Mutation('iamUpsertRoleAccount')
    async main(
        @Args('payload') payload: IamUpdateRoleAccountByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRoleAccount>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
