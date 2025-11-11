import { IamRoleAccount } from '@api/graphql';
import { IamFindRoleAccountHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.roleAccount.get')
export class IamFindRoleAccountResolver {
    constructor(private readonly handler: IamFindRoleAccountHandler) {}

    @Query('iamFindRoleAccount')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRoleAccount> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
