import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeleteTenantByIdHandler } from '../handlers/iam-delete-tenant-by-id.handler';
import { IamTenant } from '../../../../graphql';

@Resolver()
export class IamDeleteTenantByIdResolver
{
    constructor(
        private readonly handler: IamDeleteTenantByIdHandler,
    ) {}

    @Mutation('iamDeleteTenantById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
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