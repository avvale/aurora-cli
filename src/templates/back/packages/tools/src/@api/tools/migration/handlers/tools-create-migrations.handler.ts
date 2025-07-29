import { ToolsCreateMigrationInput } from '@api/graphql';
import { ToolsCreateMigrationDto } from '@api/tools/migration';
import { ToolsCreateMigrationsCommand } from '@app/tools/migration';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCreateMigrationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: ToolsCreateMigrationInput[] | ToolsCreateMigrationDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new ToolsCreateMigrationsCommand(
            payload.map(migration => ({
                ...migration,
                isExecuted: false,
            })),
            {
                timezone,
            },
        ));

        return true;
    }
}
