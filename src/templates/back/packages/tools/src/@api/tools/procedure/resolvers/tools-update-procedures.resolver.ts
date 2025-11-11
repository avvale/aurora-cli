import { ToolsProcedure, ToolsUpdateProceduresInput } from '@api/graphql';
import { ToolsUpdateProceduresHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.update')
export class ToolsUpdateProceduresResolver {
    constructor(private readonly handler: ToolsUpdateProceduresHandler) {}

    @Mutation('toolsUpdateProcedures')
    async main(
        @Args('payload') payload: ToolsUpdateProceduresInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsProcedure> {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
