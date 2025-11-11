import { ToolsMigration } from '@api/graphql';
import { ToolsFindMigrationHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.get')
export class ToolsFindMigrationResolver {
    constructor(private readonly handler: ToolsFindMigrationHandler) {}

    @Query('toolsFindMigration')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsMigration> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
