import { CommonGetResourcesHandler } from '@api/common/resource';
import { CommonResource } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.resource.get')
export class CommonGetResourcesResolver
{
    constructor(
        private readonly handler: CommonGetResourcesHandler,
    ) {}

    @Query('commonGetResources')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonResource[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
