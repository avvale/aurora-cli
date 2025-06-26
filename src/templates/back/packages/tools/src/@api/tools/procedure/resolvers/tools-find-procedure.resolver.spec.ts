/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindProcedureHandler, ToolsFindProcedureResolver } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindProcedureResolver', () =>
{
    let resolver: ToolsFindProcedureResolver;
    let handler: ToolsFindProcedureHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsFindProcedureResolver,
                {
                    provide : ToolsFindProcedureHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsFindProcedureResolver>(ToolsFindProcedureResolver);
        handler = module.get<ToolsFindProcedureHandler>(ToolsFindProcedureHandler);
    });

    test('ToolsFindProcedureResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsFindProcedureResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a procedure', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockProcedureData[0])));
            expect(await resolver.main()).toBe(toolsMockProcedureData[0]);
        });
    });
});
