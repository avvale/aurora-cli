import { ToolsProcedure } from '@api/graphql';
import { ToolsDeleteProceduresHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.delete')
export class ToolsDeleteProceduresResolver {
    constructor(private readonly handler: ToolsDeleteProceduresHandler) {}

    @Mutation('toolsDeleteProcedures')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsProcedure[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
