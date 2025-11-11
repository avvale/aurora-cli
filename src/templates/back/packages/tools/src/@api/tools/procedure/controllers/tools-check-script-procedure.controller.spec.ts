/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsCheckScriptProcedureHandler } from '../handlers/tools-check-script-procedure.handler';
import { ToolsCheckScriptProcedureController } from './tools-check-script-procedure.controller';

describe('ToolsCheckScriptProcedureController', () => {
    let controller: ToolsCheckScriptProcedureController;
    let handler: ToolsCheckScriptProcedureHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsCheckScriptProcedureController],
            providers: [
                {
                    provide: ToolsCheckScriptProcedureHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsCheckScriptProcedureController>(
            ToolsCheckScriptProcedureController,
        );
        handler = module.get<ToolsCheckScriptProcedureHandler>(
            ToolsCheckScriptProcedureHandler,
        );
    });

    describe('main', () => {
        test('ToolsCheckScriptProcedureController should be defined', () => {
            expect(controller).toBeDefined();
        });
    });
});
