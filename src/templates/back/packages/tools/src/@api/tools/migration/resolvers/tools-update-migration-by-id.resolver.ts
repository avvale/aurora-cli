import { ToolsMigration, ToolsUpdateMigrationByIdInput } from '@api/graphql';
import { ToolsUpdateMigrationByIdHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.update')
export class ToolsUpdateMigrationByIdResolver {
  constructor(private readonly handler: ToolsUpdateMigrationByIdHandler) {}

  @Mutation('toolsUpdateMigrationById')
  async main(
    @Args('payload') payload: ToolsUpdateMigrationByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<ToolsMigration> {
    return await this.handler.main(payload, constraint, timezone);
  }
}
