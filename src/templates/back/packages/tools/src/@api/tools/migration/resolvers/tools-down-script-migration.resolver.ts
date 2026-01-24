import { ToolsDownScriptMigrationHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.update')
export class ToolsDownScriptMigrationResolver {
  constructor(private readonly handler: ToolsDownScriptMigrationHandler) {}

  @Mutation('toolsDownScriptMigration')
  async main(
    @Args('migrationId') migrationId: string,
    @Timezone() timezone?: string,
  ): Promise<boolean> {
    return await this.handler.main(migrationId, timezone);
  }
}
