import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { ToolsCreateMigrationsCommand } from '@app/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';

@Injectable()
export class ToolsMigrationSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new ToolsCreateMigrationsCommand(
            toolsMockMigrationData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
