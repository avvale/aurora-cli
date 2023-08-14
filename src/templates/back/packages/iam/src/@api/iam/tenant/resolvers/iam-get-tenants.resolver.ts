import { IamTenant } from '@api/graphql';
import { IamGetTenantsHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenant.get')
export class IamGetTenantsResolver
{
    constructor(
        private readonly handler: IamGetTenantsHandler,
    ) {}

    @Query('iamGetTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
