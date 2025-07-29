/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpScriptMigrationHandler } from '../handlers/tools-up-script-migration.handler';
import { ToolsUpScriptMigrationController } from './tools-up-script-migration.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpScriptMigrationController', () =>
{
    let controller: ToolsUpScriptMigrationController;
    let handler: ToolsUpScriptMigrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsUpScriptMigrationController,
            ],
            providers: [
                {
                    provide : ToolsUpScriptMigrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsUpScriptMigrationController>(ToolsUpScriptMigrationController);
        handler = module.get<ToolsUpScriptMigrationHandler>(ToolsUpScriptMigrationHandler);
    });

    describe('main', () =>
    {
        test('ToolsUpScriptMigrationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});