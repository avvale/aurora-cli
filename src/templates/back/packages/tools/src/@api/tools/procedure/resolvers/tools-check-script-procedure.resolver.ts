import { ToolsCheckScriptProcedureHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.update')
export class ToolsCheckScriptProcedureResolver
{
    constructor(
        private readonly handler: ToolsCheckScriptProcedureHandler,
    ) {}

    @Mutation('toolsCheckScriptProcedure')
    async main(
        @Args('procedureId') procedureId: string,
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            procedureId,
            timezone,
        );
    }
}
