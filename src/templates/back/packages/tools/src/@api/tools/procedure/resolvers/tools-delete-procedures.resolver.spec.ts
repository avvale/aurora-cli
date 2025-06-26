/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteProceduresHandler, ToolsDeleteProceduresResolver } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteProceduresResolver', () =>
{
    let resolver: ToolsDeleteProceduresResolver;
    let handler: ToolsDeleteProceduresHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsDeleteProceduresResolver,
                {
                    provide : ToolsDeleteProceduresHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsDeleteProceduresResolver>(ToolsDeleteProceduresResolver);
        handler = module.get<ToolsDeleteProceduresHandler>(ToolsDeleteProceduresHandler);
    });

    test('ToolsDeleteProceduresResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsDeleteProceduresResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an toolsMockProcedureData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockProcedureData)));
            expect(await resolver.main()).toBe(toolsMockProcedureData);
        });
    });
});
