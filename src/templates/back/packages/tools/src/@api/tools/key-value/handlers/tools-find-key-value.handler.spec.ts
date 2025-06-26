/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindKeyValueHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindKeyValueHandler', () =>
{
    let handler: ToolsFindKeyValueHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsFindKeyValueHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<ToolsFindKeyValueHandler>(ToolsFindKeyValueHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsFindKeyValueHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsFindKeyValueHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a keyValue', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(toolsMockKeyValueData[0]);
        });
    });
});
