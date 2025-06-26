/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpScriptProcedureHandler } from './tools-up-script-procedure.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpScriptProcedureHandler', () =>
{
    let handler: ToolsUpScriptProcedureHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsUpScriptProcedureHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler     = module.get<ToolsUpScriptProcedureHandler>(ToolsUpScriptProcedureHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('ToolsUpScriptProcedureHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});