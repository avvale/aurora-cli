/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsRunScriptsMigrationHandler } from '../handlers/tools-run-scripts-migration.handler';
import { ToolsRunScriptsMigrationController } from './tools-run-scripts-migration.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsRunScriptsMigrationController', () =>
{
    let controller: ToolsRunScriptsMigrationController;
    let handler: ToolsRunScriptsMigrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsRunScriptsMigrationController,
            ],
            providers: [
                {
                    provide : ToolsRunScriptsMigrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsRunScriptsMigrationController>(ToolsRunScriptsMigrationController);
        handler = module.get<ToolsRunScriptsMigrationHandler>(ToolsRunScriptsMigrationHandler);
    });

    describe('main', () =>
    {
        test('ToolsRunScriptsMigrationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});