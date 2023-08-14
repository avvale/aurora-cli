/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerFindQueueByIdHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindQueueByIdHandler', () =>
{
    let handler: QueueManagerFindQueueByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerFindQueueByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<QueueManagerFindQueueByIdHandler>(QueueManagerFindQueueByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('QueueManagerFindQueueByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerFindQueueByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an queue by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockQueueData[0])));
            expect(
                await handler.main(
                    queueManagerMockQueueData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(queueManagerMockQueueData[0]);
        });
    });
});
