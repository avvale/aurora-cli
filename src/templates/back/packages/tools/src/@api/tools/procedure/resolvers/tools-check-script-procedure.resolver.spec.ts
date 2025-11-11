/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsCheckScriptProcedureHandler } from '../handlers/tools-check-script-procedure.handler';
import { ToolsCheckScriptProcedureResolver } from './tools-check-script-procedure.resolver';

describe('ToolsCheckScriptProcedureResolver', () => {
    let resolver: ToolsCheckScriptProcedureResolver;
    let handler: ToolsCheckScriptProcedureHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsCheckScriptProcedureResolver,
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

        resolver = module.get<ToolsCheckScriptProcedureResolver>(
            ToolsCheckScriptProcedureResolver,
        );
        handler = module.get<ToolsCheckScriptProcedureHandler>(
            ToolsCheckScriptProcedureHandler,
        );
    });

    test('ToolsCheckScriptProcedureResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsCheckScriptProcedureResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });
    });
});
