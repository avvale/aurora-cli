import { ToolsCreateMigrationsCommand, ToolsDeleteMigrationsCommand, ToolsGetMigrationsQuery } from '@app/tools/migration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { migrations } from 'src/assets/tools/migrations';

@Injectable()
export class ToolsLoadMigrationsService
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async onApplicationBootstrap(): Promise<void>
    {
        // get all migrations
        const migrationsInDatabase = await this.queryBus.ask(new ToolsGetMigrationsQuery());

        const migrationsToStorage = [];
        for (const migration of migrations)
        {
            const migrationInDatabase = migrationsInDatabase.find(migrationInDatabase => migrationInDatabase.id === migration.id);

            if (migrationInDatabase)
            {
                migrationsToStorage.push({
                    ...migrationInDatabase,
                    name      : migration.name,
                    version   : migration.version,
                    upScript  : migration.upScript,
                    downScript: migration.downScript,
                    sort      : migration.sort,
                });
            }
            else
            {
                migrationsToStorage.push({
                    ...migration,
                    isActive  : false,
                    isExecuted: false,
                });
            }
        }

        // delete all migrations
        await this.commandBus.dispatch(new ToolsDeleteMigrationsCommand({
            where: {},
        }));

        await this.commandBus.dispatch(new ToolsCreateMigrationsCommand(
            migrationsToStorage,
        ));
    }
}
