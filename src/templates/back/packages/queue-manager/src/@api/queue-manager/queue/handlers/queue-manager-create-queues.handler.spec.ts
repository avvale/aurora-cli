import { QueueManagerCreateQueuesHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateQueuesHandler', () => {
    let handler: QueueManagerCreateQueuesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerCreateQueuesHandler,
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<QueueManagerCreateQueuesHandler>(
            QueueManagerCreateQueuesHandler,
        );
    });

    describe('main', () => {
        test('QueueManagerCreateQueuesHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an queueManagerMockQueueData created', async () => {
            expect(await handler.main(queueManagerMockQueueData)).toBe(true);
        });
    });
});
