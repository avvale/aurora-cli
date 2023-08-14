import { IamTenant } from '@api/graphql';
import { IamFindTenantByIdHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
