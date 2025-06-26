import { ToolsCreateProcedureInput, ToolsProcedure } from '@api/graphql';
import { ToolsCreateProcedureHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.create')
export class ToolsCreateProcedureResolver
{
    constructor(
        private readonly handler: ToolsCreateProcedureHandler,
    ) {}

    @Mutation('toolsCreateProcedure')
    async main(
        @Args('payload') payload: ToolsCreateProcedureInput,
        @Timezone() timezone?: string,
    ): Promise<ToolsProcedure>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
