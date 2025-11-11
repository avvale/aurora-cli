import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
    ToolsCreateMigrationsCommand,
    toolsMockMigrationData,
} from '@app/tools/migration';

@Injectable()
export class ToolsMigrationSeeder {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean> {
        await this.commandBus.dispatch(
            new ToolsCreateMigrationsCommand(toolsMockMigrationData, {
                timezone: process.env.TZ,
            }),
        );

        return true;
    }
}
