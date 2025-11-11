/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsRunScriptsProcedureHandler } from '../handlers/tools-run-scripts-procedure.handler';
import { ToolsRunScriptsProcedureResolver } from './tools-run-scripts-procedure.resolver';

describe('ToolsRunScriptsProcedureResolver', () => {
    let resolver: ToolsRunScriptsProcedureResolver;
    let handler: ToolsRunScriptsProcedureHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsRunScriptsProcedureResolver,
                {
                    provide: ToolsRunScriptsProcedureHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsRunScriptsProcedureResolver>(
            ToolsRunScriptsProcedureResolver,
        );
        handler = module.get<ToolsRunScriptsProcedureHandler>(
            ToolsRunScriptsProcedureHandler,
        );
    });

    test('ToolsRunScriptsProcedureResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsRunScriptsProcedureResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });
    });
});
