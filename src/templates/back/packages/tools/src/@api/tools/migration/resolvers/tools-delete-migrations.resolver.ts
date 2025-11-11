import { ToolsMigration } from '@api/graphql';
import { ToolsDeleteMigrationsHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.delete')
export class ToolsDeleteMigrationsResolver {
    constructor(private readonly handler: ToolsDeleteMigrationsHandler) {}

    @Mutation('toolsDeleteMigrations')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsMigration[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
