/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDownScriptProcedureHandler } from '../handlers/tools-down-script-procedure.handler';
import { ToolsDownScriptProcedureResolver } from './tools-down-script-procedure.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDownScriptProcedureResolver', () =>
{
    let resolver: ToolsDownScriptProcedureResolver;
    let handler: ToolsDownScriptProcedureHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsDownScriptProcedureResolver,
                {
                    provide : ToolsDownScriptProcedureHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsDownScriptProcedureResolver>(ToolsDownScriptProcedureResolver);
        handler = module.get<ToolsDownScriptProcedureHandler>(ToolsDownScriptProcedureHandler);
    });

    test('ToolsDownScriptProcedureResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsDownScriptProcedureResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});