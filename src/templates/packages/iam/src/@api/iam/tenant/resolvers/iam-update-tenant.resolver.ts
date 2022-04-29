import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamUpdateTenantHandler } from '../handlers/iam-update-tenant.handler';
import { IamTenant, IamUpdateTenantInput } from '../../../../graphql';

@Resolver()
export class IamUpdateTenantResolver
{
    constructor(
        private readonly handler: IamUpdateTenantHandler,
    ) {}

    @Mutation('iamUpdateTenant')
    async main(
        @Args('payload') payload: IamUpdateTenantInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}