import { ToolsMigration } from '@api/graphql';
import { ToolsDeleteMigrationByIdHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.delete')
export class ToolsDeleteMigrationByIdResolver
{
    constructor(
        private readonly handler: ToolsDeleteMigrationByIdHandler,
    ) {}

    @Mutation('toolsDeleteMigrationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsMigration>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
