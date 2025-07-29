import { toolsMockMigrationData, ToolsUpdateMigrationsCommand } from '@app/tools/migration';
import { ToolsUpdateMigrationsCommandHandler } from '@app/tools/migration/application/update/tools-update-migrations.command-handler';
import { ToolsUpdateMigrationsService } from '@app/tools/migration/application/update/tools-update-migrations.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateMigrationsCommandHandler', () =>
{
    let commandHandler: ToolsUpdateMigrationsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsUpdateMigrationsCommandHandler,
                {
                    provide : ToolsUpdateMigrationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<ToolsUpdateMigrationsCommandHandler>(ToolsUpdateMigrationsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateMigrationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an migrations updated', async () =>
        {
            expect(await commandHandler.execute(
                new ToolsUpdateMigrationsCommand(
                    {
                        id: toolsMockMigrationData[0].id,
                        name: toolsMockMigrationData[0].name,
                        version: toolsMockMigrationData[0].version,
                        isActive: toolsMockMigrationData[0].isActive,
                        isExecuted: toolsMockMigrationData[0].isExecuted,
                        upScript: toolsMockMigrationData[0].upScript,
                        downScript: toolsMockMigrationData[0].downScript,
                        sort: toolsMockMigrationData[0].sort,
                        executedAt: toolsMockMigrationData[0].executedAt,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
