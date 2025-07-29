/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsRunScriptsProcedureHandler } from '../handlers/tools-run-scripts-procedure.handler';
import { ToolsRunScriptsProcedureController } from './tools-run-scripts-procedure.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsRunScriptsProcedureController', () =>
{
    let controller: ToolsRunScriptsProcedureController;
    let handler: ToolsRunScriptsProcedureHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsRunScriptsProcedureController,
            ],
            providers: [
                {
                    provide : ToolsRunScriptsProcedureHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsRunScriptsProcedureController>(ToolsRunScriptsProcedureController);
        handler = module.get<ToolsRunScriptsProcedureHandler>(ToolsRunScriptsProcedureHandler);
    });

    describe('main', () =>
    {
        test('ToolsRunScriptsProcedureController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});