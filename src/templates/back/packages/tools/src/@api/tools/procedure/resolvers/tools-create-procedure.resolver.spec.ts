/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsCreateProcedureInput } from '@api/graphql';
import { ToolsCreateProcedureHandler, ToolsCreateProcedureResolver } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateProcedureResolver', () =>
{
    let resolver: ToolsCreateProcedureResolver;
    let handler: ToolsCreateProcedureHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsCreateProcedureResolver,
                {
                    provide : ToolsCreateProcedureHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsCreateProcedureResolver>(ToolsCreateProcedureResolver);
        handler = module.get<ToolsCreateProcedureHandler>(ToolsCreateProcedureHandler);
    });

    test('ToolsCreateProcedureResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsCreateProcedureResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an procedure created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockProcedureData[0])));
            expect(await resolver.main(<ToolsCreateProcedureInput>toolsMockProcedureData[0])).toBe(toolsMockProcedureData[0]);
        });
    });
});
