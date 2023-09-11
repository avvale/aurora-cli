import { IamRoleAccount, IamUpdateRoleAccountByIdInput } from '@api/graphql';
import { IamUpdateRoleAccountByIdHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.roleAccount.update')
export class IamUpdateRoleAccountByIdResolver
{
    constructor(
        private readonly handler: IamUpdateRoleAccountByIdHandler,
    ) {}

    @Mutation('iamUpdateRoleAccountById')
    async main(
        @Args('payload') payload: IamUpdateRoleAccountByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRoleAccount>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
