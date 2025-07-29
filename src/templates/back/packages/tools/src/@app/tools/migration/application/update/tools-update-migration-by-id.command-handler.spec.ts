import { toolsMockMigrationData, ToolsUpdateMigrationByIdCommand } from '@app/tools/migration';
import { ToolsUpdateMigrationByIdCommandHandler } from '@app/tools/migration/application/update/tools-update-migration-by-id.command-handler';
import { ToolsUpdateMigrationByIdService } from '@app/tools/migration/application/update/tools-update-migration-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateMigrationByIdCommandHandler', () =>
{
    let commandHandler: ToolsUpdateMigrationByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsUpdateMigrationByIdCommandHandler,
                {
                    provide : ToolsUpdateMigrationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<ToolsUpdateMigrationByIdCommandHandler>(ToolsUpdateMigrationByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateMigrationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an migration created', async () =>
        {
            expect(await commandHandler.execute(
                new ToolsUpdateMigrationByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
