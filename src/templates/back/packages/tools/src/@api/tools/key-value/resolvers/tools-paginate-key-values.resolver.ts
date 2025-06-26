import { Pagination } from '@api/graphql';
import { ToolsPaginateKeyValuesHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.keyValue.get')
export class ToolsPaginateKeyValuesResolver
{
    constructor(
        private readonly handler: ToolsPaginateKeyValuesHandler,
    ) {}

    @Query('toolsPaginateKeyValues')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
