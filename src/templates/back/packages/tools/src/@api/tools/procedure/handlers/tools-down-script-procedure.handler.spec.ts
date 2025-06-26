/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDownScriptProcedureHandler } from './tools-down-script-procedure.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDownScriptProcedureHandler', () =>
{
    let handler: ToolsDownScriptProcedureHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsDownScriptProcedureHandler,
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

        handler     = module.get<ToolsDownScriptProcedureHandler>(ToolsDownScriptProcedureHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('ToolsDownScriptProcedureHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});