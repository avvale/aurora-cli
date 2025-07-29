import { ToolsMigration } from '@api/graphql';
import { ToolsFindMigrationByIdHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.get')
export class ToolsFindMigrationByIdResolver
{
    constructor(
        private readonly handler: ToolsFindMigrationByIdHandler,
    ) {}

    @Query('toolsFindMigrationById')
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
