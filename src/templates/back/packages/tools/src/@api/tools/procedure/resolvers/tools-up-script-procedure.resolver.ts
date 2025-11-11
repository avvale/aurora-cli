import { ToolsUpScriptProcedureHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.execution')
export class ToolsUpScriptProcedureResolver {
    constructor(private readonly handler: ToolsUpScriptProcedureHandler) {}

    @Mutation('toolsUpScriptProcedure')
    async main(
        @Args('procedureId') procedureId: string,
        @Timezone() timezone?: string,
    ): Promise<boolean> {
        return await this.handler.main(procedureId, timezone);
    }
}
