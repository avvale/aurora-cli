import { ToolsRunScriptsProcedureHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.update')
export class ToolsRunScriptsProcedureResolver {
    constructor(private readonly handler: ToolsRunScriptsProcedureHandler) {}

    @Mutation('toolsRunScriptsProcedure')
    async main(@Timezone() timezone?: string): Promise<boolean> {
        return await this.handler.main(timezone);
    }
}
