/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsGetProceduresHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetProceduresHandler', () =>
{
    let handler: ToolsGetProceduresHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsGetProceduresHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<ToolsGetProceduresHandler>(ToolsGetProceduresHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsGetProceduresHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsGetProceduresHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a toolsMockProcedureData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(toolsMockProcedureData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(toolsMockProcedureData);
        });
    });
});
