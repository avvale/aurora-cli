import { IamTenantAccount } from '@api/graphql';
import { IamFindTenantAccountByIdHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.get')
export class IamFindTenantAccountByIdResolver {
    constructor(private readonly handler: IamFindTenantAccountByIdHandler) {}

    @Query('iamFindTenantAccountById')
    async main(
        @Args('tenantId') tenantId: string,
        @Args('accountId') accountId: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenantAccount> {
        return await this.handler.main(
            tenantId,
            accountId,
            constraint,
            timezone,
        );
    }
}
