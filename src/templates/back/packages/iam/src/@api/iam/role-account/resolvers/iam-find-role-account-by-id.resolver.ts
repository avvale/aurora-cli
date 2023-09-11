import { IamRoleAccount } from '@api/graphql';
import { IamFindRoleAccountByIdHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.roleAccount.get')
export class IamFindRoleAccountByIdResolver
{
    constructor(
        private readonly handler: IamFindRoleAccountByIdHandler,
    ) {}

    @Query('iamFindRoleAccountById')
    async main(
        @Args('roleId') roleId: string,
        @Args('accountId') accountId: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRoleAccount>
    {
        return await this.handler.main(
            roleId,
            accountId,
            constraint,
            timezone,
        );
    }
}
