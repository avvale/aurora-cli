import { Pagination } from '@api/graphql';
import { IamPaginateTenantsHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.get')
export class IamPaginateTenantsResolver
{
    constructor(
        private readonly handler: IamPaginateTenantsHandler,
    ) {}

    @Query('iamPaginateTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
