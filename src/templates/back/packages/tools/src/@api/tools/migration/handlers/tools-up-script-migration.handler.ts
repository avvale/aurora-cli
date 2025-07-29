import { ToolsRawSQLInformationSchemaCommand } from '@app/tools/information-schema';
import { ToolsFindMigrationByIdQuery, ToolsUpdateMigrationByIdCommand } from '@app/tools/migration';
import { ICommandBus, IQueryBus, now } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsUpScriptMigrationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        migrationId: string,
        timezone?: string,
    ): Promise<boolean>
    {
        const migration = await this.queryBus.ask(new ToolsFindMigrationByIdQuery(
            migrationId,
            {},
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new ToolsRawSQLInformationSchemaCommand(
            {
                rawSQL: migration.upScript,
            },
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new ToolsUpdateMigrationByIdCommand(
            {
                id        : migration.id,
                isExecuted: true,
                executedAt: now().tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
            },
            {},
            {
                timezone,
            },
        ));

        return true;
    }
}