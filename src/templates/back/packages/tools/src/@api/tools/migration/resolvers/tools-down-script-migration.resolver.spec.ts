/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDownScriptMigrationHandler } from '../handlers/tools-down-script-migration.handler';
import { ToolsDownScriptMigrationResolver } from './tools-down-script-migration.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDownScriptMigrationResolver', () =>
{
    let resolver: ToolsDownScriptMigrationResolver;
    let handler: ToolsDownScriptMigrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsDownScriptMigrationResolver,
                {
                    provide : ToolsDownScriptMigrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsDownScriptMigrationResolver>(ToolsDownScriptMigrationResolver);
        handler = module.get<ToolsDownScriptMigrationHandler>(ToolsDownScriptMigrationHandler);
    });

    test('ToolsDownScriptMigrationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsDownScriptMigrationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});