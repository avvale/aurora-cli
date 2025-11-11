import { ToolsCreateMigrationInput, ToolsMigration } from '@api/graphql';
import { ToolsCreateMigrationHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.create')
export class ToolsCreateMigrationResolver {
    constructor(private readonly handler: ToolsCreateMigrationHandler) {}

    @Mutation('toolsCreateMigration')
    async main(
        @Args('payload') payload: ToolsCreateMigrationInput,
        @Timezone() timezone?: string,
    ): Promise<ToolsMigration> {
        return await this.handler.main(payload, timezone);
    }
}
