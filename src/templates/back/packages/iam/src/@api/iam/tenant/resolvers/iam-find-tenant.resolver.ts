import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindTenantHandler } from '../handlers/iam-find-tenant.handler';
import { IamTenant } from '@api/graphql';

@Resolver()
@Auth('iam.tenant.get')
export class IamFindTenantResolver
{
    constructor(
        private readonly handler: IamFindTenantHandler,
    ) {}

    @Query('iamFindTenant')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}