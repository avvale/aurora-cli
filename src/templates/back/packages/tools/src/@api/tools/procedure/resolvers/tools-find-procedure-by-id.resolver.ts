import { ToolsProcedure } from '@api/graphql';
import { ToolsFindProcedureByIdHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.get')
export class ToolsFindProcedureByIdResolver {
  constructor(private readonly handler: ToolsFindProcedureByIdHandler) {}

  @Query('toolsFindProcedureById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<ToolsProcedure> {
    return await this.handler.main(id, constraint, timezone);
  }
}
