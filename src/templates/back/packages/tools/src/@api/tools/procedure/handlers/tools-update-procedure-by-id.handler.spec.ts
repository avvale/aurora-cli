/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateProcedureByIdInput } from '@api/graphql';
import { ToolsUpdateProcedureByIdHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateProcedureByIdHandler', () =>
{
    let handler: ToolsUpdateProcedureByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsUpdateProcedureByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<ToolsUpdateProcedureByIdHandler>(ToolsUpdateProcedureByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsUpdateProcedureByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsUpdateProcedureByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a procedure updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(toolsMockProcedureData[0])));
            expect(
                await handler.main(
                    <ToolsUpdateProcedureByIdInput>toolsMockProcedureData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(toolsMockProcedureData[0]);
        });
    });
});
