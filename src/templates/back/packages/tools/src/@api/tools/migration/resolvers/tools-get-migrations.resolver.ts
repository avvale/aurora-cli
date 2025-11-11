import { ToolsMigration } from '@api/graphql';
import { ToolsGetMigrationsHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.get')
export class ToolsGetMigrationsResolver {
    constructor(private readonly handler: ToolsGetMigrationsHandler) {}

    @Query('toolsGetMigrations')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsMigration[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
