/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteProcedureByIdHandler, ToolsDeleteProcedureByIdResolver } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteProcedureByIdResolver', () =>
{
    let resolver: ToolsDeleteProcedureByIdResolver;
    let handler: ToolsDeleteProcedureByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsDeleteProcedureByIdResolver,
                {
                    provide : ToolsDeleteProcedureByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsDeleteProcedureByIdResolver>(ToolsDeleteProcedureByIdResolver);
        handler = module.get<ToolsDeleteProcedureByIdHandler>(ToolsDeleteProcedureByIdHandler);
    });

    test('ToolsDeleteProcedureByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsDeleteProcedureByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an procedure deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockProcedureData[0])));
            expect(await resolver.main(toolsMockProcedureData[0].id)).toBe(toolsMockProcedureData[0]);
        });
    });
});
