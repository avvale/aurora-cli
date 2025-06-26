import { ToolsKeyValue } from '@api/graphql';
import { ToolsFindKeyValueByIdHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.keyValue.get')
export class ToolsFindKeyValueByIdResolver
{
    constructor(
        private readonly handler: ToolsFindKeyValueByIdHandler,
    ) {}

    @Query('toolsFindKeyValueById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsKeyValue>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
