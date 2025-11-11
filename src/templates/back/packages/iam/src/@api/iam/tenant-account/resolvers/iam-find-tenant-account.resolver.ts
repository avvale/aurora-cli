import { IamTenantAccount } from '@api/graphql';
import { IamFindTenantAccountHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.get')
export class IamFindTenantAccountResolver {
    constructor(private readonly handler: IamFindTenantAccountHandler) {}

    @Query('iamFindTenantAccount')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenantAccount> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
