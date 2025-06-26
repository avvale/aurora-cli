/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpScriptProcedureHandler } from '../handlers/tools-up-script-procedure.handler';
import { ToolsUpScriptProcedureResolver } from './tools-up-script-procedure.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpScriptProcedureResolver', () =>
{
    let resolver: ToolsUpScriptProcedureResolver;
    let handler: ToolsUpScriptProcedureHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsUpScriptProcedureResolver,
                {
                    provide : ToolsUpScriptProcedureHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsUpScriptProcedureResolver>(ToolsUpScriptProcedureResolver);
        handler = module.get<ToolsUpScriptProcedureHandler>(ToolsUpScriptProcedureHandler);
    });

    test('ToolsUpScriptProcedureResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsUpScriptProcedureResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});