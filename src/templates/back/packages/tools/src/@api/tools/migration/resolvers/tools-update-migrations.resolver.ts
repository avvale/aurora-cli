import { ToolsMigration, ToolsUpdateMigrationsInput } from '@api/graphql';
import { ToolsUpdateMigrationsHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.update')
export class ToolsUpdateMigrationsResolver {
    constructor(private readonly handler: ToolsUpdateMigrationsHandler) {}

    @Mutation('toolsUpdateMigrations')
    async main(
        @Args('payload') payload: ToolsUpdateMigrationsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsMigration> {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
