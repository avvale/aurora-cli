/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpdateQueueByIdInput } from '@api/graphql';
import { QueueManagerUpdateQueueByIdHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateQueueByIdHandler', () =>
{
    let handler: QueueManagerUpdateQueueByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpdateQueueByIdHandler,
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

        handler = module.get<QueueManagerUpdateQueueByIdHandler>(QueueManagerUpdateQueueByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('QueueManagerUpdateQueueByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateQueueByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a queue updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockQueueData[0])));
            expect(
                await handler.main(
                    <QueueManagerUpdateQueueByIdInput>queueManagerMockQueueData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(queueManagerMockQueueData[0]);
        });
    });
});
