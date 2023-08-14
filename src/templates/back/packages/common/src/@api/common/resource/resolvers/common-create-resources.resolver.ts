import { CommonCreateResourcesHandler } from '@api/common/resource';
import { CommonCreateResourceInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.resource.create')
export class CommonCreateResourcesResolver
{
    constructor(
        private readonly handler: CommonCreateResourcesHandler,
    ) {}

    @Mutation('commonCreateResources')
    async main(
        @Args('payload') payload: CommonCreateResourceInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
