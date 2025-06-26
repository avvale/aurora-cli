import { ToolsProcedure } from '@api/graphql';
import { ToolsGetProceduresHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.get')
export class ToolsGetProceduresResolver
{
    constructor(
        private readonly handler: ToolsGetProceduresHandler,
    ) {}

    @Query('toolsGetProcedures')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsProcedure[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
