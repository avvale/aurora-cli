/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsCheckScriptProcedureHandler } from './tools-check-script-procedure.handler';

describe('ToolsCheckScriptProcedureHandler', () => {
    let handler: ToolsCheckScriptProcedureHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsCheckScriptProcedureHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<ToolsCheckScriptProcedureHandler>(
            ToolsCheckScriptProcedureHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => {
        test('ToolsCheckScriptProcedureHandler should be defined', () => {
            expect(handler).toBeDefined();
        });
    });
});
