/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsDownScriptProcedureHandler } from '../handlers/tools-down-script-procedure.handler';
import { ToolsDownScriptProcedureController } from './tools-down-script-procedure.controller';

describe('ToolsDownScriptProcedureController', () => {
    let controller: ToolsDownScriptProcedureController;
    let handler: ToolsDownScriptProcedureHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsDownScriptProcedureController],
            providers: [
                {
                    provide: ToolsDownScriptProcedureHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsDownScriptProcedureController>(
            ToolsDownScriptProcedureController,
        );
        handler = module.get<ToolsDownScriptProcedureHandler>(
            ToolsDownScriptProcedureHandler,
        );
    });

    describe('main', () => {
        test('ToolsDownScriptProcedureController should be defined', () => {
            expect(controller).toBeDefined();
        });
    });
});
