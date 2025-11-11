import { ToolsCreateMigrationInput } from '@api/graphql';
import { ToolsCreateMigrationsHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.create')
export class ToolsCreateMigrationsResolver {
    constructor(private readonly handler: ToolsCreateMigrationsHandler) {}

    @Mutation('toolsCreateMigrations')
    async main(
        @Args('payload') payload: ToolsCreateMigrationInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean> {
        return await this.handler.main(payload, timezone);
    }
}
