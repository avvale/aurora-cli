import { ToolsCreateMigrationsCommand } from '@app/tools/migration';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { migrations } from 'src/assets/tools/migrations';

@Injectable()
export class ToolsLoadMigrationsService
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async onApplicationBootstrap(): Promise<void>
    {
        await this.commandBus.dispatch(new ToolsCreateMigrationsCommand(
            migrations.map(migration => ({
                ...migration,
                isActive  : false,
                isExecuted: false,
            })),
            {
                repositoryOptions: {
                    updateOnDuplicate: ['name', 'version', 'upScript', 'downScript', 'sort'],
                    conflictAttributes: ['id'],
                },
            },
        ));
    }
}
