import { IamTenant } from '@api/graphql';
import { IamFindTenantHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.get')
export class IamFindTenantResolver {
    constructor(private readonly handler: IamFindTenantHandler) {}

    @Query('iamFindTenant')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
