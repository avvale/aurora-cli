import { CommonUpdateResourcesHandler } from '@api/common/resource';
import { CommonResource, CommonUpdateResourcesInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.resource.update')
export class CommonUpdateResourcesResolver
{
    constructor(
        private readonly handler: CommonUpdateResourcesHandler,
    ) {}

    @Mutation('commonUpdateResources')
    async main(
        @Args('payload') payload: CommonUpdateResourcesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonResource>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
