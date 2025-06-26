/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsPaginateProceduresHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateProceduresHandler', () =>
{
    let handler: ToolsPaginateProceduresHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsPaginateProceduresHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<ToolsPaginateProceduresHandler>(ToolsPaginateProceduresHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsPaginateProceduresHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsPaginateProceduresHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a procedures', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: toolsMockProcedureData.length,
                count: toolsMockProcedureData.length,
                rows : toolsMockProcedureData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: toolsMockProcedureData.length,
                    count: toolsMockProcedureData.length,
                    rows : toolsMockProcedureData,
                });
        });
    });
});
