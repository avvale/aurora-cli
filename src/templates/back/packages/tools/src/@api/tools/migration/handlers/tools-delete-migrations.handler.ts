import { ToolsMigration } from '@api/graphql';
import { ToolsMigrationDto } from '@api/tools/migration';
import { ToolsDeleteMigrationsCommand, ToolsGetMigrationsQuery } from '@app/tools/migration';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDeleteMigrationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsMigration[] | ToolsMigrationDto[]>
    {
        const migrations = await this.queryBus.ask(new ToolsGetMigrationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new ToolsDeleteMigrationsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return migrations;
    }
}
