import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { IamCreateTenantHandler } from '../handlers/iam-create-tenant.handler';
import { IamTenant, IamCreateTenantInput } from '../../../../graphql';

@Resolver()
export class IamCreateTenantResolver
{
    constructor(
        private readonly handler: IamCreateTenantHandler,
    ) {}

    @Mutation('iamCreateTenant')
    async main(
        @Args('payload') payload: IamCreateTenantInput,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}