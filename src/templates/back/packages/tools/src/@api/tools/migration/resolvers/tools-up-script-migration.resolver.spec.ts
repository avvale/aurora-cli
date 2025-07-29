/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpScriptMigrationHandler } from '../handlers/tools-up-script-migration.handler';
import { ToolsUpScriptMigrationResolver } from './tools-up-script-migration.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpScriptMigrationResolver', () =>
{
    let resolver: ToolsUpScriptMigrationResolver;
    let handler: ToolsUpScriptMigrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsUpScriptMigrationResolver,
                {
                    provide : ToolsUpScriptMigrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsUpScriptMigrationResolver>(ToolsUpScriptMigrationResolver);
        handler = module.get<ToolsUpScriptMigrationHandler>(ToolsUpScriptMigrationHandler);
    });

    test('ToolsUpScriptMigrationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsUpScriptMigrationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});