import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindTenantByIdHandler } from '../handlers/iam-find-tenant-by-id.handler';
import { IamTenant } from '@api/graphql';

@Resolver()
@Auth('iam.tenant.get')
export class IamFindTenantByIdResolver
{
    constructor(
        private readonly handler: IamFindTenantByIdHandler,
    ) {}

    @Query('iamFindTenantById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}