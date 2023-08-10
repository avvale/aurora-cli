/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpsertQueueHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpsertQueueHandler', () =>
{
    let handler: QueueManagerUpsertQueueHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpsertQueueHandler,
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

        handler = module.get<QueueManagerUpsertQueueHandler>(QueueManagerUpsertQueueHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('QueueManagerUpsertQueueHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an queue upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockQueueData[0])));
            expect(
                await handler.main(
                    queueManagerMockQueueData[0],
                    'Europe/Madrid',
                ))
                .toBe(queueManagerMockQueueData[0]);
        });
    });
});
