/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerGetQueuesHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerGetQueuesHandler', () => {
    let handler: QueueManagerGetQueuesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                QueueManagerGetQueuesHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<QueueManagerGetQueuesHandler>(
            QueueManagerGetQueuesHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('QueueManagerGetQueuesHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('QueueManagerGetQueuesHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a queueManagerMockQueueData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockQueueData),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                queueManagerMockQueueData,
            );
        });
    });
});
