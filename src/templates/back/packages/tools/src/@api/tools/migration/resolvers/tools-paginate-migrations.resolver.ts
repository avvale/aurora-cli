import { Pagination } from '@api/graphql';
import { ToolsPaginateMigrationsHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.get')
export class ToolsPaginateMigrationsResolver
{
    constructor(
        private readonly handler: ToolsPaginateMigrationsHandler,
    ) {}

    @Query('toolsPaginateMigrations')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
