import { ToolsMigration } from '@api/graphql';
import { ToolsMigrationDto } from '@api/tools/migration';
import {
    ToolsDeleteMigrationByIdCommand,
    ToolsFindMigrationByIdQuery,
} from '@app/tools/migration';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDeleteMigrationByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsMigration | ToolsMigrationDto> {
        const migration = await this.queryBus.ask(
            new ToolsFindMigrationByIdQuery(id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new ToolsDeleteMigrationByIdCommand(id, constraint, {
                timezone,
            }),
        );

        return migration;
    }
}
