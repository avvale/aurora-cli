import { ToolsCreateProcedureInput } from '@api/graphql';
import { ToolsCreateProceduresHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.create')
export class ToolsCreateProceduresResolver
{
    constructor(
        private readonly handler: ToolsCreateProceduresHandler,
    ) {}

    @Mutation('toolsCreateProcedures')
    async main(
        @Args('payload') payload: ToolsCreateProcedureInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
