/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsRunScriptsMigrationHandler } from '../handlers/tools-run-scripts-migration.handler';
import { ToolsRunScriptsMigrationResolver } from './tools-run-scripts-migration.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsRunScriptsMigrationResolver', () =>
{
    let resolver: ToolsRunScriptsMigrationResolver;
    let handler: ToolsRunScriptsMigrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsRunScriptsMigrationResolver,
                {
                    provide : ToolsRunScriptsMigrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsRunScriptsMigrationResolver>(ToolsRunScriptsMigrationResolver);
        handler = module.get<ToolsRunScriptsMigrationHandler>(ToolsRunScriptsMigrationHandler);
    });

    test('ToolsRunScriptsMigrationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsRunScriptsMigrationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});