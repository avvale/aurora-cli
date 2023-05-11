import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetTenantsHandler } from '../handlers/iam-get-tenants.handler';
import { IamTenant } from '@api/graphql';

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