import {
    ToolsDeleteMigrationByIdCommand,
    toolsMockMigrationData,
} from '@app/tools/migration';
import { ToolsDeleteMigrationByIdCommandHandler } from '@app/tools/migration/application/delete/tools-delete-migration-by-id.command-handler';
import { ToolsDeleteMigrationByIdService } from '@app/tools/migration/application/delete/tools-delete-migration-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteMigrationByIdCommandHandler', () => {
    let commandHandler: ToolsDeleteMigrationByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsDeleteMigrationByIdCommandHandler,
                {
                    provide: ToolsDeleteMigrationByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsDeleteMigrationByIdCommandHandler>(
            ToolsDeleteMigrationByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteMigrationByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the ToolsDeleteMigrationByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsDeleteMigrationByIdCommand(
                        toolsMockMigrationData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
