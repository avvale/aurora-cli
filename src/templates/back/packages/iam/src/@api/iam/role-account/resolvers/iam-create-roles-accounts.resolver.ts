import { IamCreateRoleAccountInput } from '@api/graphql';
import { IamCreateRolesAccountsHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.roleAccount.create')
export class IamCreateRolesAccountsResolver {
    constructor(private readonly handler: IamCreateRolesAccountsHandler) {}

    @Mutation('iamCreateRolesAccounts')
    async main(
        @Args('payload') payload: IamCreateRoleAccountInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean> {
        return await this.handler.main(payload, timezone, auditing);
    }
}
