/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerFindQueueHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindQueueHandler', () =>
{
    let handler: QueueManagerFindQueueHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerFindQueueHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<QueueManagerFindQueueHandler>(QueueManagerFindQueueHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('QueueManagerFindQueueHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerFindQueueHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a queue', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockQueueData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(queueManagerMockQueueData[0]);
        });
    });
});
