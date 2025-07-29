/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDownScriptMigrationHandler } from '../handlers/tools-down-script-migration.handler';
import { ToolsDownScriptMigrationController } from './tools-down-script-migration.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDownScriptMigrationController', () =>
{
    let controller: ToolsDownScriptMigrationController;
    let handler: ToolsDownScriptMigrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsDownScriptMigrationController,
            ],
            providers: [
                {
                    provide : ToolsDownScriptMigrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsDownScriptMigrationController>(ToolsDownScriptMigrationController);
        handler = module.get<ToolsDownScriptMigrationHandler>(ToolsDownScriptMigrationHandler);
    });

    describe('main', () =>
    {
        test('ToolsDownScriptMigrationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});