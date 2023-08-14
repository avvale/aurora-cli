import { CommonDeleteResourcesHandler } from '@api/common/resource';
import { CommonResource } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.resource.delete')
export class CommonDeleteResourcesResolver
{
    constructor(
        private readonly handler: CommonDeleteResourcesHandler,
    ) {}

    @Mutation('commonDeleteResources')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonResource[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
