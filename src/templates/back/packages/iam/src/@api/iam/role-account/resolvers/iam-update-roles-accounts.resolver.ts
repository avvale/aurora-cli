import { IamRoleAccount, IamUpdateRolesAccountsInput } from '@api/graphql';
import { IamUpdateRolesAccountsHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.roleAccount.update')
export class IamUpdateRolesAccountsResolver {
    constructor(private readonly handler: IamUpdateRolesAccountsHandler) {}

    @Mutation('iamUpdateRolesAccounts')
    async main(
        @Args('payload') payload: IamUpdateRolesAccountsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRoleAccount> {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
