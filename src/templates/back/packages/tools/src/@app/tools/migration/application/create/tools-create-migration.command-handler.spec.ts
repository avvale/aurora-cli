import { ToolsCreateMigrationCommandHandler } from './tools-create-migration.command-handler';
import { ToolsCreateMigrationService } from './tools-create-migration.service';
import { ToolsCreateMigrationCommand, toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateMigrationCommandHandler', () =>
{
    let commandHandler: ToolsCreateMigrationCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsCreateMigrationCommandHandler,
                {
                    provide : ToolsCreateMigrationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<ToolsCreateMigrationCommandHandler>(ToolsCreateMigrationCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateMigrationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the ToolsCreateMigrationService', async () =>
        {
            expect(await commandHandler.execute(
                new ToolsCreateMigrationCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
