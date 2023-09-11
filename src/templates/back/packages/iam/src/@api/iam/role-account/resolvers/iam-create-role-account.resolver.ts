import { IamCreateRoleAccountInput, IamRoleAccount } from '@api/graphql';
import { IamCreateRoleAccountHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.roleAccount.create')
export class IamCreateRoleAccountResolver
{
    constructor(
        private readonly handler: IamCreateRoleAccountHandler,
    ) {}

    @Mutation('iamCreateRoleAccount')
    async main(
        @Args('payload') payload: IamCreateRoleAccountInput,
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
