/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindProcedureByIdHandler, ToolsFindProcedureByIdResolver } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindProcedureByIdResolver', () =>
{
    let resolver: ToolsFindProcedureByIdResolver;
    let handler: ToolsFindProcedureByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsFindProcedureByIdResolver,
                {
                    provide : ToolsFindProcedureByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsFindProcedureByIdResolver>(ToolsFindProcedureByIdResolver);
        handler = module.get<ToolsFindProcedureByIdHandler>(ToolsFindProcedureByIdHandler);
    });

    test('ToolsFindProcedureByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsFindProcedureByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an procedure by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockProcedureData[0])));
            expect(await resolver.main(toolsMockProcedureData[0].id)).toBe(toolsMockProcedureData[0]);
        });
    });
});
