import { ToolsProcedure, ToolsUpdateProcedureByIdInput } from '@api/graphql';
import { ToolsUpdateProcedureByIdHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.update')
export class ToolsUpdateProcedureByIdResolver {
  constructor(private readonly handler: ToolsUpdateProcedureByIdHandler) {}

  @Mutation('toolsUpdateProcedureById')
  async main(
    @Args('payload') payload: ToolsUpdateProcedureByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<ToolsProcedure> {
    return await this.handler.main(payload, constraint, timezone);
  }
}
