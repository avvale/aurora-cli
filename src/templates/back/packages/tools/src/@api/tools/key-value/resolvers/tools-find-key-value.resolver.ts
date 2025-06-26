import { ToolsKeyValue } from '@api/graphql';
import { ToolsFindKeyValueHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.keyValue.get')
export class ToolsFindKeyValueResolver
{
    constructor(
        private readonly handler: ToolsFindKeyValueHandler,
    ) {}

    @Query('toolsFindKeyValue')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsKeyValue>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
