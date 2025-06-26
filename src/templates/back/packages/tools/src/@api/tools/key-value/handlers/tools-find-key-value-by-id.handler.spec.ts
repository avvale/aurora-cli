/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindKeyValueByIdHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindKeyValueByIdHandler', () =>
{
    let handler: ToolsFindKeyValueByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsFindKeyValueByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<ToolsFindKeyValueByIdHandler>(ToolsFindKeyValueByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsFindKeyValueByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsFindKeyValueByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an keyValue by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData[0])));
            expect(
                await handler.main(
                    toolsMockKeyValueData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(toolsMockKeyValueData[0]);
        });
    });
});
